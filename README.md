# Foundry VTT Rich Presence
![Static Badge](https://img.shields.io/badge/Foundry%20Minimum-12.331-orange)
![Static Badge](https://img.shields.io/badge/Foundry%20Verified-13.442-lightgreen)
![Static Badge](https://img.shields.io/badge/D&D5e%20Minimum-4.3.9-orange)
![Static Badge](https://img.shields.io/badge/D&D5e%20Verified-5.0.1-lightgreen)
![Static Badge](https://img.shields.io/badge/PF2e%20Verified-6.12.1-lightgreen)
![Static Badge](https://img.shields.io/badge/License-MIT-yellow)

A Foundry VTT module that enables Discord Rich Presence on a Foundry world. It sends some information about the user such as class, level, or whether they're currently in a battle or not.

**Note: In order to use this module, you also need to be using my fork of [FVTT Desktop Client](https://github.com/JeidoUran/fvtt-player-client), as it contains the necessary code to send the data exposed by this module to Discord.**

The module has been tested on the D&D5e and PF2e game systems. I do not know how well or if it would work at all on other systems.

![image](https://github.com/user-attachments/assets/8dcc3a99-926f-4d5c-a13d-a17068c5328a)
![image](https://github.com/user-attachments/assets/7353a476-6791-4950-932b-672d29e3302e)

If you're a GM, the module will hide some of the information displayed to prevent spoilers.

## Installation
- Open Foundry VTT, then navigate to the **Add-on Modules** tab.
- Click the **Install Module** button, a new window will open.
- In the **Manifest URL** field, at the very bottom of the window, paste the following URL:
     ``` 
     https://github.com/JeidoUran/fvtt-rich-presence/releases/latest/download/module.json
     ```
## How to Use
- Launch the [FVTT Desktop Client](https://github.com/JeidoUran/fvtt-player-client).
- Open the **Client Configuration** and make sure **Enable Discord Rich Presence** is checked.
![image](https://github.com/user-attachments/assets/c6c7b2e8-d4d9-4d72-9ea7-8242e350f948)
- Log in to your Foundry VTT World.
- In **Configure Settings**, navigate to **Foundry VTT Rich Presence** and make sure **Enable Discord Rich Presence** is also checked. 
![image](https://github.com/user-attachments/assets/aad94072-6e39-4138-88a0-28fbc687d02c)
- **Every player logging in to this World needs to follow these steps. Rich Presence is turned off on both the Client and Module by default.**

## Acknowledgments and attributions

Special thanks to [cswendrowski](https://github.com/cswendrowski), as this module is a spiritual successor to [FoundryVTT Discord Rich Presence](https://github.com/cswendrowski/FoundryVTT-Discord-Rich-Presence?tab=readme-ov-file). While the execution and final results are vastly different, the original idea comes from seeing their module.

Rich Presence icons designed by [Freepik](http://www.freepik.com/).

## Disclaimer

Parts of the code have been generated by an artificial intelligence language model (ChatGPT). If you see anything weird and/or that could be done in a better way, feel free to submit a [GitHub Issue](https://github.com/JeidoUran/fvtt-rich-presence/issues) or [Pull Request](https://github.com/JeidoUran/fvtt-rich-presence/pulls).

## Support

For issues, suggestions, or contributions, please submit a [GitHub Issue](https://github.com/JeidoUran/fvtt-rich-presence/issues) or [Pull Request](https://github.com/JeidoUran/fvtt-rich-presence/pulls).
