<template>
  <div class="question-page">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">选择知识点</el-breadcrumb-item>
      <el-breadcrumb-item>测验</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 测验试题 -->
    <el-card class="question" v-for="question in questions" v-bind:key="question.id">
      <div slot="header" class="clearfix">
        <span style="display: flex;flex-direction: row; align-items: center">
          <div>{{question.id+1}}.</div>
          <el-image
            style="height: 50px"
            :src="baseDomain + question.baseUrl + '0.png'"
            fit="contain"
          ></el-image>
        </span>
      </div>
      <div style="position: relative" v-for="o in 4" :key="o" class="text item">
        <el-radio
          :disabled="submit"
          v-model="userAns[question.id]"
          :label="hashChoose(question.id,o)"
        >
          <el-image
            style="height: 50px"
            :src="baseDomain +question.baseUrl + hashChoose(question.id,o) +'.png'"
            fit="contain"
          ></el-image>
        </el-radio>
        <img
          class="sign"
          src="../assets/yes.png"
          v-if="correct[question.id][hashChoose(question.id,o)-1]"
        />
        <img
          class="sign"
          src="../assets/no.png"
          v-if="wrong[question.id][hashChoose(question.id,o)-1]"
        />
      </div>
      <el-divider v-if="submit"></el-divider>
      <div class="answer" v-if="submit">
        <div style="display: flex;flex-direction: row; align-items: center">
          <p>正确答案:</p>
          <el-image :src="baseDomain + question.baseUrl + question.ans + '.png'" fit="contain"></el-image>
        </div>
        <div class="ans-detial">
          <el-image :src="baseDomain + question.ansDetail" fit="contain"></el-image>
        </div>
      </div>
    </el-card>
    <!-- 提交悬浮按钮 -->
    <div id="submit-box">
      <el-tooltip class="item" v-if="!submit" effect="dark" content="提交试卷" placement="left">
        <el-button type="primary" icon="el-icon-check" v-on:click="getScore" circle></el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    backHome() {
      this.$router.push({
        name: "choose"
      });
    },
    // 这个函数用于打乱选项顺序
    hashChoose(qid, cid) {
      return ((qid + this.randomNum + cid) % 4) + 1;
    },
    // 提交试卷,获取分数
    getScore() {
      let qid = 0;
      let correct = 0;
      let _this = this;
      console.log(this.userAns);
      this.userAns.forEach(function(element) {
        console.log(element);
        if (element == _this.questions[qid].ans) {
          _this.correct[qid][element - 1] = true; // 如果答案正确在对应位置打上对号
          correct++;
        } else {
          if (element) { // 如果是undefine不操作
            _this.wrong[qid][element - 1] = true; // 答案错误打上错号
          }
        }
        qid++;
      });
      this.$notify({
        title: "分数",
        message: `正确:${correct} 错误:${this.questions.length - correct}`,
        duration: 0
      });
      this.submit = true;
    }
  },
  data() {
    return {
      randomNum: parseInt(Math.random() * 10) % 4,
      submit: false,
      baseDomain: "https://math.neuyan.com/",
      questions: [],
      userAns: [],
      correct: [],
      wrong: []
    };
  },
  created() {
    this.questions = this.$route.params.questions;
    if (this.questions == undefined) {
      this.$router.push({
        name: "choose"
      });
      return;
    }
    this.userAns = Array(this.questions.length).fill();
    this.wrong = Array.from(Array(this.questions.length), () =>
      Array(4).fill(false)
    );
    this.correct = Array.from(Array(this.questions.length), () =>
      Array(4).fill(false)
    );
  }
};
</script>

<style>
.question {
  margin: 10px 0;
}

.ans-detial .answer {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.ans-detial {
  width: auto;
}

/*用于使选项和图片对其*/
.el-radio {
  display: flex;
  align-items: center;
  padding: 2px;
}

/*对号错号*/
.sign {
  position: absolute;
  left: 2px;
  bottom: 8px;
  height: 20px;
}

#submit-box {
  position: fixed;
  right: 0;
  top: 100px;
  margin-left: 3px;
  display: flex;
  flex-direction: column;
}
</style>