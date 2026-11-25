# Facial Geometry Calculator for VS Code

Lightweight, zero-dependency VS Code extension for computing 2D facial landmark geometry metrics directly from the Command Palette.

## Commands

Open the Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`) and run:

- **Facial Geometry: Calculate Canthal Tilt** — computes medial-to-lateral canthal tilt angle in degrees from top-down `(x, y)` coordinates.
- **Facial Geometry: Calculate Facial Thirds Balance** — computes normalized upper/middle/lower vertical thirds and balance score from `trichionY, glabellaY, subnasaleY, mentonY`.
- **Facial Geometry: Calculate Golden Ratio Delta** — computes `faceHeight / faceWidth` and its signed deviation from `Phi (1.6180...)`.

Every command lets you copy the formatted result to your clipboard in one click.

## Reference & Online Calculator

Interactive visual verification and landmark definitions:
- [Looksmax Scale](https://looksmaxscale.com/)
- [Canthal Tilt Measurement Guide](https://looksmaxscale.com/canthal-tilt)
- [Facial Proportion Reference](https://looksmaxscale.com/attractiveness-test)

## License

MIT
