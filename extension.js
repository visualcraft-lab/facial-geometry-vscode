"use strict";

const vscode = require("vscode");
const {
  canthalTiltDeg,
  computeFacialThirds,
  goldenRatioDelta,
  parseNumberList,
} = require("./lib/geometry");

async function showResultWithCopy(summary) {
  const action = await vscode.window.showInformationMessage(summary, "Copy Result");
  if (action === "Copy Result") {
    await vscode.env.clipboard.writeText(summary);
  }
}

function activate(context) {
  const tiltCmd = vscode.commands.registerCommand("facialGeometry.canthalTilt", async () => {
    const raw = await vscode.window.showInputBox({
      prompt: "Enter medialX, medialY, lateralX, lateralY (top-down image coordinates)",
      placeHolder: "100, 200, 140, 193",
    });
    if (!raw) return;
    try {
      const [mx, my, lx, ly] = parseNumberList(raw, 4);
      const deg = canthalTiltDeg({ x: mx, y: my }, { x: lx, y: ly });
      await showResultWithCopy(`Canthal Tilt: ${deg.toFixed(2)} deg`);
    } catch (err) {
      vscode.window.showErrorMessage(String(err.message || err));
    }
  });

  const thirdsCmd = vscode.commands.registerCommand("facialGeometry.facialThirds", async () => {
    const raw = await vscode.window.showInputBox({
      prompt: "Enter trichionY, glabellaY, subnasaleY, mentonY (strictly increasing)",
      placeHolder: "100, 200, 300, 400",
    });
    if (!raw) return;
    try {
      const [t, g, s, m] = parseNumberList(raw, 4);
      const res = computeFacialThirds(t, g, s, m);
      const msg =
        `Facial Thirds: ${(res.upper * 100).toFixed(1)}% / ` +
        `${(res.middle * 100).toFixed(1)}% / ${(res.lower * 100).toFixed(1)}% ` +
        `(Balance: ${(res.balanceScore * 100).toFixed(1)}%)`;
      await showResultWithCopy(msg);
    } catch (err) {
      vscode.window.showErrorMessage(String(err.message || err));
    }
  });

  const goldenCmd = vscode.commands.registerCommand("facialGeometry.goldenRatio", async () => {
    const raw = await vscode.window.showInputBox({
      prompt: "Enter faceHeight, faceWidth (positive numbers)",
      placeHolder: "161.8, 100",
    });
    if (!raw) return;
    try {
      const [h, w] = parseNumberList(raw, 2);
      const res = goldenRatioDelta(h, w);
      const sign = res.delta >= 0 ? "+" : "";
      await showResultWithCopy(
        `Height/Width Ratio: ${res.ratio.toFixed(4)} (Delta from Phi: ${sign}${res.delta.toFixed(4)})`
      );
    } catch (err) {
      vscode.window.showErrorMessage(String(err.message || err));
    }
  });

  context.subscriptions.push(tiltCmd, thirdsCmd, goldenCmd);
}

function deactivate() {}

module.exports = { activate, deactivate };
