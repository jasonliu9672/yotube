<template>
  <v-container fluid class="grey ma-0 pa-0">
    <v-row no-gutters>
      <v-col cols="9">
        <v-card color="grey">
          <video ref="videoPlayer" controls autoplay muted width="100%"></video>
        </v-card>
        <!-- <v-container class="d-flex flex-row">
          <v-avatar size="62">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
        </v-container> -->
      </v-col>
      <div class="fixed-chat">
        <v-card outlined class="text-center">
          <v-card-subtitle> 實況聊天室 </v-card-subtitle>
          <v-divider></v-divider>
          <v-card-text>
            <v-card ref="messages" height="500px" class="messages">
              <v-list dense>
                <template v-for="(message, index) in messages">
                  <v-list-item :key="index">
                    <div class="d-flex flex-row">
                      <p class="chat-username mb-0" :style="{color: randomColor()}">{{ message.username }}:</p>
                      <p class="chat-text mb-0" :style="{color: 'black'}"> {{ message.text }}</p>
                    </div>
                  </v-list-item>
                </template>
              </v-list>
            </v-card>
            <v-text-field
              :disabled="!isLogin"
              v-model="message"
              @keyup.enter="sendMessage"
              placeholder="傳送訊息"
              outlined
              dense
              class
            ></v-text-field>
            <v-card-text>Current Online: {{ onlineCount }}</v-card-text>
          </v-card-text>
        </v-card>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";
import io from "socket.io-client";
import Cookies from "js-cookie";
import { getStreamId } from "../../apis/user.js";
const socket = io("localhost:4000", {
  transports: ["websocket"],
  upgrade: false,
});

export default {
  layout: "default",
  data() {
    return {
      messages: [],
      flvPlayer: undefined,
      message: "",
      onlineCount: 0,
      isLogin: false,
      username: Cookies.get("username") || "",
    };
  },
  created() {
    if (this.username !== "") this.isLogin = true;
    socket.emit("newConnect", this.$route.params.streamId);
    socket.on("newMessage", (message) => {
      this.messages.push(message);
    });
    socket.on("online", (onlineCount) => {
      console.log("online: ", onlineCount);
      this.onlineCount = onlineCount;
    });
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
      let streamId = "test";
      getStreamId(this.$route.params.streamId)
        .then(res => {
          streamId = res.streamId;
          this.flvPlayer = flv.createPlayer({
          type: "flv",
          isLive: true,
          hasAudio: false,
          url:
            process.env.mediaServerUrl +
            `/live/${streamId}.flv`,
        });
        let videoElement = this.$refs.videoPlayer;
        this.flvPlayer.attachMediaElement(videoElement);
        this.flvPlayer.load();
        this.flvPlayer.play();
        }).catch(err => {console.log(err);})
    }
  },
  watch: {
    messages: 'scrollToBottom'
  },
  components: {
    Logo,
    VuetifyLogo,
  },
  methods: {
     randomColor() {
      const r = () => Math.floor(256 * Math.random());

      return `rgb(${r()}, ${r()}, ${r()})`;
    },
    sendMessage() {
      if (!this.message.trim()) {
        return;
      }
      console.log(this.$store.getters);
      const message = { username: this.username, text: this.message.trim() };
      this.messages.push(message);
      this.message = "";
      socket.emit("sendMessage", message);
      console.log(this.message);
    },
    scrollToBottom () {
      this.$nextTick(() => {
        this.$refs.messages.$refs.link.scrollTop = this.$refs.messages.$refs.link.scrollHeight
      })
    }
  }
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
.messages {
  height: 100%;
  margin: 0;
  overflow-y: scroll;
}
</style>
