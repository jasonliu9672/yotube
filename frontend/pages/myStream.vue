<template>
  <div>
    <v-stepper v-model="progress" vertical>
      <v-stepper-step :complete="progress > 1" step="1">
        取得你的專屬金鑰
        <small>這就是你的</small>
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-card color="lighten-1" class="mb-12" height="80">
          <v-dialog v-model="dialog" persistent max-width="290">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mx-2"
                fab
                dark
                large
                color="gold"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon dark> mdi-key-variant </v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="headline">你的金鑰</v-card-title>
              <v-card-text>{{key}}</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="dialog = false">
                  複製好了
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>
        <v-btn color="primary" @click="progress = 2"> 繼續 </v-btn>
        <v-btn text outlined @click="progress = 1"> 取消 </v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="progress > 2" step="2">
        開始直播
      </v-stepper-step>

      <v-stepper-content step="2">
        <p>
          請開啟你的網路直播軟體,例如OBS,在設定中將目標伺服器改為rtmp://13.58.198.221/live,並輸入在上一步驟所取得的金鑰
        </p>
        <v-btn text outlined @click="progress = 1"> 取消 </v-btn>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>
<script>
import { getStreamId } from "../apis/user.js";
export default {
    layout: "default",
    middleware: "authenticated",
  data() {
    return {
      progress: 1,
      dialog: false,
      key:"",
    };
  },
  created() {
    getStreamId(this.$store.getters['user/username']).then(
      res => this.key = res.streamId
    )
  },
  // async asyncData({store}) {
  //   console.log(store)
  //   const response = await getStreamId(store.getters.user.username);
  //   return { key: res.streamId };
  // },
};
</script>
<style lang="scss">
</style>