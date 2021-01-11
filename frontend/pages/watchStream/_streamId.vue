<template>
  <v-container fluid class="grey ma-0 pa-0">
    <v-row no-gutters>
      <v-col cols="9">
        <v-card color="grey">
          <video ref="videoPlayer" controls autoplay muted width="100%"></video>
        </v-card>
        <v-container class="d-flex flex-row">
          <v-avatar size="62">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
        </v-container>
      </v-col>
      <div class="fixed-chat">
        <v-card outlined class="text-center">
          <v-card-subtitle> 實況聊天室 </v-card-subtitle>
          <v-divider></v-divider>
          <v-card-text>
            <v-card height="500px" class="overflow-auto">
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
      </div>
    </v-row>
  </v-container>
</template>

<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";
// import flvjs from 'flv.js';

export default {
  layout: "default",
  data() {
    return {
      messages: [{ username: "Jason", text: "yoyo" }],
      flvPlayer: undefined,
    };
  },
  mounted() {
    // 	if (flvjs.isSupported()) {
    //     let videoElement = this.$refs.videoPlayer
    // 		let flvPlayer = flvjs.createPlayer({
    // 			type: 'flv',
    // 			isLive: true,
    // 			hasAudio: false,
    // 			url: process.env.mediaServerUrl+'/live/mystream.flv'
    // 		});
    // 		flvPlayer.attachMediaElement(videoElement);
    // 		flvPlayer.load();
    // 		flvPlayer.play();
    // 	}f
    if (process.client) {
      const flv = require("../../static/js/flv.js");
      console.log(this.$route.params);
      this.flvPlayer = flv.createPlayer({
        type: "flv",
        isLive: true,
        hasAudio: false,
        url:
          process.env.mediaServerUrl +
          `/live/${this.$route.params.streamId}.flv`,
      });
      let videoElement = this.$refs.videoPlayer;
      this.flvPlayer.attachMediaElement(videoElement);
      this.flvPlayer.load();
      this.flvPlayer.play();
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
.fixed-chat {
  right: 0;
  position: fixed;
  width: 315.8px;
}
</style>
