module.exports = {
    joinPart: ({joined = false}) =>   `<a class="btn btn-large btn-${joined ? "danger" : "primary"} bot-connect" command="${joined ? "PART" : "JOIN"}" href="#">
                                            <i class="fas fa-sign-${joined ? "out" : "in"}-alt"></i> ${joined ? "Part" : "Join"} Channel
                                        </a>`,

    header: ({reward_id = "", type = ""}) =>
        `<div class="d-flex setting-title"
        ${(()=>{
            if(type === "tts"){
                return 'style="background-image: url(\'https://i.imgur.com/qiKwwf0.png\');background-size: cover;background-position: center;"';
            }else if(type === "showemote"){
                return 'style="background-image: url(\'https://i.imgur.com/dxvhasM.png\');background-size: cover;background-position: center;"';
            }else{
                return '';
            }
        })()}
        >
            <div class="d-flex w-100">
                <button type="button"  class="delete-button btn btn-danger p-2" style="margin: 10px;flex-basis: 5%;">X</button>
                <select class="form-control setting-title-text type-selector" style="font-size:1.3rem;margin: 10px;flex-basis: 50%;">
                    <option ${type === "" ? "selected='true'" : ""} type="" disabled>Select a Module</option>
                    <option ${type === "tts" ? "selected='true'" : ""} type="tts">💬 Text-to-Speech</option>
                    <option ${type === "showemote" ? "selected='true'" : ""} type="showemote">😋 Show Emote</option>
                    <option ${type === "runcommand" ? "selected='true'" : ""} type="runcommand">⚙️ Run Command</option>
                    <!--<option ${type === "unban" ? "selected='true'" : ""} type="unban">🔄 Unban/Undo Timeout</option>-->
                    <option ${type === "video" ? "selected='true'" : ""} type="video">🎞️ Play Video</option>
                    <option ${type === "sound" ? "selected='true'" : ""} type="sound">🔊 Play Sound</option>
                </select>
                <div style="display: flex;flex-flow: column;flex-basis: 45%;">
                    <span style="background-color: white;">Bound to: <span class="reward_id">${reward_id}</span></span>
                    <button type="button" class="binder btn btn-primary m-auto">Bind to Reward</button> 
                </div>
            </div>
        </div>`,
    newReward: ({ key = 999 }) =>
        `<div key="${key}" class="alerts-lists p-2 my-3" style="display:flex; flex-direction:column; width: 100%;border-radius: 10px;background-color: #0f0f0f;" >
            <div style="display: flex;" >
                <div class="d-flex flex-column w-100">
                    <div style="flex-direction:column; justify-content: space-around; width: 100%;" >
                        ${template_header({})}
                    </div>
                    <div class="d-flex p-3 settings_container"></div>
                </div>
            </div>
        </div>`,
    tts: ({ voice ="", volume = 50, charLimit = 500, placeholder = "*", f_enabled = false, filterList = "bannedWord1 BannedWordTwo"}) =>
        `<div style="flex-direction:column; justify-content: space-around; width: 100%;" >
            <div class="form-group setting-item m-3" style="display: flex;flex-flow: row;">
                <h5 class="title-underline-blue" style="margin: auto 0;padding: unset;padding-bottom: 5px;">📜 Description: </h5>
                <p class="paragraph-info m-1 p-2">
                    When a user enters in text, it plays that text in a Text to Speech voice of your choice.
                    <br>
                    <b>Commands:</b> !skiptts
                    <br>
                </p>
            </div>
            <div class="form-group setting-item m-3">
                <h5 class="title-underline-blue" >⚙️ Settings</h5>
                <div class="m-1 p-2">
                    <div class="d-flex w-100 my-2">
                        <span class="px-3 w-25 align-self-center">Voice Name/ID:</span>
                        <div class="w-75">
                            <small><a href="/channel-points/tts-voices" target="_blank">HERE</a> Is the list of TTS Voices</small>
                            <input type="text" class="tts_voice-select form-control" aria-describedby="voiceInput" placeholder="Enter Voice Name. Example: Justin" value="${voice}">
                        </div>
                    </div>
                    <div class="d-flex w-100 my-2">
                        <span class="px-3 w-25 align-self-center">Character Limit:</span>
                        <div class="d-flex w-75">
                            <input class="tts_char-limit form-control" type="number" value="${charLimit}"  min="1" max="500" >
                        </div>
                    </div>
                    <div class="d-flex w-100 my-2">
                        <span class="px-3 w-25 align-self-center">Volume:</span>
                        <div class="d-flex w-75">
                            <span class="m-2">0</span>
                            <input type="range" class="tts_volume custom-range flex-grow-1 m-auto" value="${volume}" min="0" max="100" step="1">
                            <span class="m-2">100</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group setting-item m-3">
                <h5 class="title-underline-blue" >Filter</h5>
                <div class="m-1 p-2">
                    <div class="d-flex justify-content-between">
                        <div class="w-50 form-check">
                            <input type="checkbox" style="position: relative;" class="tts_filter-enabled form-check-input" ${f_enabled ? 'checked' : ''}>
                            <label class="form-check-label" for="tts_filter_enabled" style="padding: 5px;">Use Filter</label>
                        </div>
                        <div class="w-50 d-flex">
                            <span class="px-3 align-self-center" >Placeholder:</span> 
                            <input type="text" class="tts_filter-placeholder form-control" aria-describedby="tts_filter-placeholder" placeholder="*" value="${placeholder}">
                        </div>
                    </div>
                    <div class="d-flex my-3">
                        <textarea type="text" class="tts_filter-list form-control" aria-describedby="tts_filter_list" placeholder="BannedWord1 BannedWord1">${filterList}</textarea>
                    </div>
                    <p style="color: #959595;">
                        I suggest you use <a target="_blank" href="https://dashboard.twitch.tv/settings/moderation/blocked-terms">Twitch's Auto Mod</a> to block words and phrases in conjunction with this
                    </p>
                </div>
            </div>
        </div>`,

    showEmote: ({ size = "50px", showtime = 5000, fadetime = 500}) =>
        `<div style="flex-direction:column; justify-content: space-around; width: 100%;" >
            <div class="form-group setting-item m-3" style="display: flex;flex-flow: row;">
                <h5 class="title-underline-blue" style="margin: auto 0;padding: unset;padding-bottom: 5px;">📜 Description: </h5>
                <p class="paragraph-info m-1 p-2">
                    When a user enters in an emote of their choice, that emote  will show up on screen. Make sure your OBS Browser source is fit to screen.
                    <br>
                    <span class="text-success">
                        <a href="https://www.frankerfacez.com/" target="_blank" > FFZ (FrankerFaceZ)</a> along with <a href="https://betterttv.com/" target="_blank" >Better TTV</a> Global and Channel Emotes are supported.
                    </span>
                </p>
            </div>
            <div class="form-group setting-item m-3">
                <h5 class="title-underline-blue" >⚙️ Settings</h5>
                <div class="m-1 p-2">
                    <!-- Display Time -->
                    <div class="d-flex w-100">
                        <span class="px-3 w-25 align-self-center">Display Time (Seconds):</span>
                        <div class="d-flex w-75">
                            <input class="showemote_displayTime form-control" type="number" value="${showtime}"  min="1" max="1000000" >
                        </div>
                    </div>
                    <!-- Size -->
                    <div class="d-flex w-100">
                        <span class="px-3 w-25 align-self-center">Size (px):</span>
                        <div class="d-flex w-75">
                            <input class="showemote_size form-control" type="text" value="${size}" >
                        </div>
                    </div>
                </div>
            </div>
        </div>`,
    sound: ({ type = "single", upload_list = [{volume: 50, file_url: "", file_name: "" }]}) =>
        `<div style="flex-direction:column; justify-content: space-around; width: 100%;" >
            <div class="form-group setting-item m-3" style="display: flex;flex-flow: row;">
                <h5 class="title-underline-blue" style="margin: auto 0;padding: unset;padding-bottom: 5px;">📜 Description: </h5>
                <p class="paragraph-info m-1 p-2">
                Plays a sound when redeemed. If you have multiple sounds, a random sound will be played from the list.
                </p>
            </div>
            <div class="form-group setting-item m-3">
                <h5 class="title-underline-blue" >⚙️ Settings</h5>
                <div class="m-1 p-2">
                    <div class="d-flex w-100 my-2">
                        <span class="px-3 w-25 align-self-center">Type:</span>
                        <div class="d-flex w-75">
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" disabled>
                                <a class="dropdown-item" disabled>Single</a>
                                <a class="dropdown-item" disabled>Multiple</a>
                            </div>
                            <span style="font-size:small">Only available in single mode. Multiple will come later.</span>
                        </div>
                    </div>
                    ${(()=>{
                        if(type === "single"){
                            var div = "";
                            for (var i = 0, l = upload_list.length; i < l; i++) {
                                var obj = upload_list[i];
                                div += `<div style="display: flex;flex-wrap: wrap;">
                                            <div class="d-flex w-50 my-2">
                                                <span class="px-3 w-25 align-self-center">File:</span>
                                                <div class="d-flex w-75">
                                                    <form class="w-100">
                                                        <div class="custom-file">
                                                            <input type="file" class="custom-file-input sound_file" url="${obj.file_url}" file_name="${obj.file_name}">
                                                            <label class="custom-file-label" >${obj.file_name}</label>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>   
                                            <div class="d-flex w-50 my-2">
                                                <span class="px-3 w-25 align-self-center">Volume:</span>
                                                <div class="d-flex w-75">
                                                    <input type="range" class="custom-range custom-slider sound_volume" min="0" max="100" step="1" value="${obj.volume}">
                                                </div>
                                            </div>
                                        </div>`;
                            }
                            return div;

                        }else if(type === "multi"){
                            
                        }
                    })()}
                </div>
            </div>
        </div>`,
    //10-5-20 552PM: Add support for https://interactjs.io/ ? I guess assume 16:9 and look at the "Resizing" demo. Change the px to percentages? 
    video: ({ type = "single", upload_list = [{volume: 50, file_url: "", file_name: "", display: { x: 50, y:50, scale: 50, width: "100%", height: "100%"} }]}) =>
        `<div style="flex-direction:column; justify-content: space-around; width: 100%;" >
            <div class="form-group setting-item m-3" style="display: flex;flex-flow: row;">
                <h5 class="title-underline-blue" style="margin: auto 0;padding: unset;padding-bottom: 5px;">📜 Description: </h5>
                <p class="paragraph-info m-1 p-2">
                    Plays a video when redeemed. Supported formats: MP4/WebM
                </p>
            </div>
            <div class="form-group setting-item m-3">
                <h5 class="title-underline-blue" >⚙️ Settings</h5>
                <div class="m-1 p-2">
                    <div class="d-flex w-100 my-2">
                        <div class="d-flex w-100">
                            <div class="m-auto" style="background-color:#2a2a2a;width:500px;height:281px;position: relative;">
                                <div class="resize-drag" data-x="${upload_list[0].display.x}" data-y="${upload_list[0].display.y}"
                                style="width:${(upload_list[0].display.scale/100)*500}px;height:${(upload_list[0].display.scale/100)*281}px;transform: translate(${upload_list[0].display.x}px, ${upload_list[0].display.y}px);">
                                    ${upload_list[0].display.scale}%
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex w-100 my-2">
                        <span class="px-3 w-25 align-self-center">Type:</span>
                        <div class="d-flex w-75">
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" disabled>
                                <a class="dropdown-item" disabled>Single</a>
                                <a class="dropdown-item" disabled>Multiple</a>
                            </div>
                            <span style="font-size:small">Only available in single mode. Multiple will come later.</span>
                        </div>
                    </div>
                    ${(()=>{
                        if(type === "single"){
                            var div = "";
                            for (var i = 0, l = upload_list.length; i < l; i++) {
                                var obj = upload_list[i];
                                div += `<div style="display: flex;flex-wrap: wrap;">
                                            <div class="d-flex w-50 my-2">
                                                <span class="px-3 w-25 align-self-center">File:</span>
                                                <div class="d-flex w-75">
                                                    <form class="w-100">
                                                        <div class="custom-file">
                                                            <input type="file" class="custom-file-input video_file" url="${obj.file_url}" file_name="${obj.file_name}">
                                                            <label class="custom-file-label" >${obj.file_name}</label>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                            <div class="d-flex w-50 my-2">
                                                <span class="px-3 w-25 align-self-center">Volume:</span>
                                                <div class="d-flex w-75">
                                                    <input type="range" class="custom-range custom-slider video_volume" min="0" max="100" step="1" value="${obj.volume}">
                                                </div>
                                            </div>
                                            <div class="d-flex w-50 my-2">
                                                <span class="px-3 w-25 align-self-center">Width:</span>
                                                <div class="w-75">
                                                    <input type="text" class="video_width form-control" aria-describedby="voiceInput" placeholder="Ex. 50px or 100%" value="${obj.display['width']}">
                                                </div>
                                            </div>
                                            <div class="d-flex w-50 my-2">
                                                <span class="px-3 w-25 align-self-center">Height:</span>
                                                <div class="w-75">
                                                    <input type="text" class="video_height form-control" aria-describedby="voiceInput" placeholder="Ex. 50px or 100%" value="${obj.display['height']}">
                                                </div>
                                            </div>
                                        </div>`;
                            }
                            return div;

                        }else if(type === "multi"){
                            
                        }
                    })()}
                </div>
            </div>
        </div>`,
    command_timeout: ({ length = 600 }) =>
    `<div class="m-1 p-2">
        <div class="form-group setting-item " style="display: flex;flex-flow: row;">
            <p class="paragraph-info m-1">
            <span class="title-underline-blue" style="margin: auto 0;padding: unset;padding-bottom: 5px;"><b>About: </b></span>
            Times out a user for a time "Length". If "Require user to enter text" is checked, then the user will be able to timeout anyone (Except mods/broadcaster), otherwise, the feature will timeout the user who redeemed the reward.
            </p>
        </div>
        <div style="display: flex;flex-wrap: wrap;">
            <!--
            <div class="d-flex w-50 my-2">
                <div class="w-50 form-check">
                    <input type="checkbox" style="position: relative;" class="timeout_user_input form-check-input">
                    <label class="form-check-label" for="timeout_user_input" style="padding: 5px;">Require user to enter text</label>
                </div>
            </div>
            -->
            <div class="d-flex w-100 my-2">
                <span class="px-3 w-50 align-self-center">Length (Seconds):</span>
                <div class="d-flex w-50">
                    <input class="timeout_length form-control" type="number" value="${length}"  min="1" max="300" >
                </div>
            </div>
        </div>
    </div>`,
    command_slowmode: ({ length = 600, duration = 300 }) =>
    `<div class="m-1 p-2">
        <div class="form-group setting-item " style="display: flex;flex-flow: row;">
            <p class="paragraph-info m-1">
            <span class="title-underline-blue" style="margin: auto 0;padding: unset;padding-bottom: 5px;"><b>About: </b></span>
            When redeemed, Slow mode will automatically enable, then disable after a certain amount of time. The LENGTH is how long before DISABLING slow mode, DURATION is the time between each message.
            </p>
        </div>
        <div style="display: flex;flex-wrap: wrap;">
            <div class="d-flex w-50 my-2">
                <span class="px-3 w-50 align-self-center">Length (Seconds):</span>
                <div class="d-flex w-50">
                    <input class="slowmode_length form-control" type="number" value="${length}"  min="1" max="300" >
                </div>
            </div>
            <div class="d-flex w-50 my-2">
                <span class="px-3 w-50 align-self-center">Duration (Seconds):</span>
                <div class="d-flex w-50">
                    <input class="slowmode_duration form-control" type="number" value="${duration}"  min="1" max="300" >
                </div>
            </div>
        </div>
    </div>`,
    command_submode: ({ length = 600 }) =>
    `<div class="m-1 p-2">
        <div class="form-group setting-item " style="display: flex;flex-flow: row;">
            <p class="paragraph-info m-1">
            <span class="title-underline-blue" style="margin: auto 0;padding: unset;padding-bottom: 5px;"><b>About: </b></span>
            When redeemed, Sub-Only mode will automatically enable, then disable after a certain amount of time. The LENGTH is how long before DISABLING.
            </p>
        </div>
        <div style="display: flex;flex-wrap: wrap;">
            <div class="d-flex w-100 my-2">
                <span class="px-3 w-50 align-self-center">Length (Seconds):</span>
                <div class="d-flex w-50">
                    <input class="submode_length form-control" type="number" value="${length}"  min="1" max="1000" >
                </div>
            </div>
        </div>
    </div>`,
    command_emotemode: ({ length = 600 }) =>
    `<div class="m-1 p-2">
        <div class="form-group setting-item " style="display: flex;flex-flow: row;">
            <p class="paragraph-info m-1">
            <span class="title-underline-blue" style="margin: auto 0;padding: unset;padding-bottom: 5px;"><b>About: </b></span>
            When redeemed, Emote-Only mode will automatically enable, then disable after a certain amount of time. The LENGTH is how long before DISABLING.
            </p>
        </div>
        <div style="display: flex;flex-wrap: wrap;">
            <div class="d-flex w-100 my-2">
                <span class="px-3 w-50 align-self-center">Length (Seconds):</span>
                <div class="d-flex w-50">
                    <input class="emotemode_length form-control" type="number" value="${length}"  min="1" max="1000" >
                </div>
            </div>
        </div>
    </div>`,
    command_runad: ({ length = 30 }) =>
    `<div class="m-1 p-2 w-100">
        <div class="form-group setting-item " style="display: flex;flex-flow: row;">
            <p class="paragraph-info m-1">
            <span class="title-underline-blue" style="margin: auto 0;padding: unset;padding-bottom: 5px;"><b>About: </b></span>
            When redeemed, an ad will run for the time you set below seconds.
            </p>
        </div>
        <div style="display: flex;flex-wrap: wrap;">
            <div class="d-flex w-100 my-2">
                <span class="px-3 w-50 align-self-center">Length (Seconds):</span>
                <select class="form-control setting-title-text" style="font-size:1.3rem;margin: 10px;flex-basis: 50%;">
                    <option ${length === 30 ? "selected='true'" : ""}  length="30" >30 seconds</a>
                    <option ${length === 60 ? "selected='true'" : ""}  length="60" >60 seconds</a>
                    <option ${length === 90 ? "selected='true'" : ""}  length="90" >90 seconds</a>
                    <option ${length === 120 ? "selected='true'" : ""} length="120" >120 seconds</a>
                    <option ${length === 150 ? "selected='true'" : ""} length="150" >150 seconds</a>
                    <option ${length === 180 ? "selected='true'" : ""} length="180" >180 seconds</a>
                </select>
            </div>
        </div>
    </div>`,
    runCommand: ({ settings = {} }) =>
        `<div style="flex-direction:column; justify-content: space-around; width: 100%;" >
            <div class="form-group setting-item m-3" style="display: flex;flex-flow: row;">
                <h5 class="title-underline-blue" style="margin: auto 0;padding: unset;padding-bottom: 5px;">📜 Description: </h5>
                <p class="paragraph-info m-1 p-2">
                    Runs a command when redeemed.
                </p>
            </div>
            <div class="form-group setting-item m-3">
                <h5 class="title-underline-blue" >⚙️ Settings</h5>
                <div class="m-1 p-2">
                    <div class="d-flex w-100 my-2">
                        <span class="px-3 w-25 align-self-center">Command:</span>
                        <div class="d-flex w-75">
                            <select class="form-control setting-title-text command-selector" style="font-size:1.3rem;margin: 10px;flex-basis: 50%;">
                                <option ${settings.command === "" ? "selected='true'" : ""} command="" disabled>Select a Command</option>
                                <option ${settings.command === "timeout" ? "selected='true'" : ""} command="timeout">🕒 Timeout</option>
                                <option disabled ${settings.command === "slowmode" ? "selected='true'" : ""} command="slowmode">🐢 Slow mode</option>
                                <option disabled ${settings.command === "submode" ? "selected='true'" : ""} command="submode">⭐ Sub-only mode</option>
                                <option disabled ${settings.command === "emotemode" ? "selected='true'" : ""} command="emotemode">😂 Emote-only mode</option>
                                <option ${settings.command === "runad" ? "selected='true'" : ""} command="runad">💸 Run an Ad</option>
                                <option ${settings.command === "followage" ? "selected='true'" : ""} command="followage">💜 Follow age</option>
                                <option ${settings.command === "fortune" ? "selected='true'" : ""} command="fortune">🥠 Fortune Cookie</option>
                                <option ${settings.command === "magicball" ? "selected='true'" : ""} command="magicball">🔮 Ask Magic Ball</option>
                            </select>
                        </div>
                    </div>
                    <div class="d-flex w-100 my-2 command-features">
                    ${(()=>{
                        var html = "";
                        if(settings.command === "timeout"){
                            html += `${module.exports.command_timeout({length: settings.features["length"]})}`;
                        }else if(settings.command === "slowmode"){
                            html += `${module.exports.command_slowmode({length: settings.features["length"], duration: settings.features.duration})}`;
                        }else if(settings.command === "submode"){
                            html += `${module.exports.command_submode({length: settings.features["length"]})}`;
                        }else if(settings.command === "runad"){
                            html += `${module.exports.command_runad({length: settings.features["length"]})}`;
                        }else if(settings.command === "emotemode"){
                            html += `${module.exports.command_emotemode({length: settings.features["length"]})}`;
                        }
                        return html;
                    })()}
                    </div>
                </div>
            </div>
        </div>`,
}