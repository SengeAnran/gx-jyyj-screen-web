<template>
<div class="intelligent-solution">
  <div class="solution">
    <div class="solution-title">
      智能方案
    </div>
    <div class="content">
      您好！我是您的智能应急救援伙伴。在紧急时刻，我将为您提供快速、准确的救援信息和指导。我们将一起应对挑战
    </div>
    <div class="content">2024-10-10  12：02：46</div>
    <div class="content">您好，系统已检测到发生火灾。请保持冷静，按照以下步骤操作：
      <br/> 1. **立即撤离**：请迅速离开火灾现场，不要尝试自行扑灭火灾。
      <br/> 2.**启动应急预案**：启动您的应急预案，通知相关人员迅速行动，并组织应急救援队伍前往火灾现场展开救援工作。
      <br/> 3. **人员疏散**：迅速疏散受到威胁的人员，合理安排逃生路线和安全出口，保障人员的安全撤离
    </div>
  </div>
  <div class="question">
    <div class="question-top">
      <div class="voice">
        <img src="./img/voice.svg" alt="">
      </div>
      <el-input v-model="question" placeholder="请输入内容"/>
    </div>
    <div class="submit">
      <img src="./img/submit.svg" alt="">
    </div>
  </div>
</div>
</template>
<script setup>
import { ref } from 'vue'

const question = ref('');
</script>
<style scoped lang="scss">
.intelligent-solution {
  margin-top: 17px;
  .solution {
    width: 100%;
    height: 378px;
    padding: 22px;
    border-radius: 4px;
    //background: linear-gradient(100deg, rgba(26, 72, 130, 0.32) 0%, rgba(26, 72, 130, 0.16) 92.48%);
    background: linear-gradient(100deg, rgba(26, 72, 130, 0.32) 0%, rgba(26, 72, 130, 0.16) 92.48%);
    .solution-title {
      margin-bottom: 12px;
      font-size: 22px;
      color: #FFF;
      font-family: "PingFang SC";
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 142.857% */
    }
    .content {
      white-space: pre-wrap;
      color: #FFF;
      font-family: "PingFang SC";
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 142.857% */
    }
  }
  .question {
    width: 312px;
    height: 108px;
    position: relative;
    padding: 27px 18px 0;
    margin-top: 17px;
    flex-shrink: 0;
    border-radius: 4px;
    background: linear-gradient(100deg, rgba(26, 72, 130, 0.32) 0%, rgba(26, 72, 130, 0.16) 92.48%);
    .question-top {
      display: flex;
      align-items: start;
      .voice {
        width: 24px;
        height: 24px;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .el-input {
        --el-input-border-color: none;
        --el-input-focus-border: none;
        --el-input-border: 0;
        ::v-deep .el-input__wrapper {
          background-color: inherit;
          .el-input__inner::placeholder {
            color: rgba(255, 255, 255, 0.30);
            //text-align:center;
          }
        }
      }
    }
    .submit {
      position: absolute;
      right: 15px;
    }
  }
}
</style>
