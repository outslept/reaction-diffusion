# reaction–diffusion

> An interactive **Gray–Scott reaction–diffusion** simulator

## Controls & Shortcuts

| Action | Pointer / Touch | Keyboard |
| :--- | :--- | :--- |
| **Add Chemical $B$** | Click / drag on canvas | - |
| **Resize Brush** | Scroll wheel on canvas | - |
| **Switch Preset** | Click preset tab | `1` – `5` |
| **Play / Pause** | Click Play/Pause button | `Space` |
| **Clear Canvas** | Click Clear button | `C` |
| **Reset Seed** | Click Reset button | `R` |

---

## Presets

Each preset configures the **Feed rate ($F$)** and **Kill rate ($k$)** of the Gray–Scott system:

| Key | Preset | Feed ($F$) | Kill ($k$) | Behavior |
| :---: | :--- | :---: | :---: | :--- |
| `1` | **coral** | `0.0545` | `0.0620` | Branching labyrinthine coral growth |
| `2` | **mitosis** | `0.0367` | `0.0649` | Self-replicating spots that split like cells |
| `3` | **spirals** | `0.0180` | `0.0510` | Slow, self-sustaining spiral waves |
| `4` | **worms** | `0.0780` | `0.0610` | Writhing vermicular structures |
| `5` | **solitons** | `0.0300` | `0.0620` | Stable localized pulses |
