<template>
  <v-container fluid class="grey ma-0">
    <v-row no-gutters>
      <v-col cols="2">
        <v-card class="pa-2" outlined> 推薦的頻道 </v-card>
      </v-col>
      <v-col cols="7">
        <v-card color="black"> 
          <video ref="videoPlayer" controls autoplay muted width="600" height="450"></video>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card outlined class="text-center">
          <v-card-subtitle> 實況聊天室 </v-card-subtitle>
          <v-divider></v-divider>
          <v-card-text >
            <v-card height="400" class="overflow-auto">
              <v-list>
                <template v-for="(message, index) in messages">
                  <v-list-item :key="index">
                    <div class="d-flex flex-row">
                      <p class="chat-username">{{ message.username }}:</p>
                      <p class="chat-text">{{ message.text }}</p>
                    </div>
                  </v-list-item>
                </template>
              </v-list>
            </v-card>
            <v-text-field
              placeholder="傳送訊息"
              outlined
              dense
              class
            ></v-text-field>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";
import flvjs from 'flv.js';

export default {
  layout: "default",
  data() {
    return {
      messages: [
          { username: "Jason", text: "yoyo" },
          ],
    };
  },
  mounted(){
	if (flvjs.isSupported()) {
    let videoElement = this.$ref.videoPlayer
		let flvPlayer = flvjs.createPlayer({
			type: 'flv',
			isLive: true,
			hasAudio: false,
			url: 'http://www.xxxxxxx.com:18080/11/22.flv'
		});
		flvPlayer.attachMediaElement(videoElement);
		flvPlayer.load();
		flvPlayer.play();
	}

},
  components: {
    Logo,
    VuetifyLogo,
  },
};
</script>
<style lang="scss">
.chat-text {
  color: grey;
}
.chat-username {
  font-weight: bold;
  font-size: 1.1em;
}
</style>
