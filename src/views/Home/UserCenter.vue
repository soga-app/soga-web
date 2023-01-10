<template>
  <div class="user-center">
    <div
      ><div class="user-info">
        <div class="user-info-up">
          <div class="user-info-up-left">
            <div class="head-pic"
              ><img src="../../assets/img/user/girl.png" alt="" style="width: 68px; height: 68px"
            /></div>
            <div class="user-text-info">
              <div class="name">planetlll</div>
              <div class="isVip"
                ><svg-icon name="icon-liebiaoye-VIPjiaobiao" font-size="40px" />
              </div>
            </div>
          </div>
          <div class="user-info-up-right">退出登录 </div>
        </div>
        <div class="user-info-down">
          <div class="user-info-down-left">修改个人资料</div>
          <div class="user-info-down-mid">|</div>
          <div class="user-info-down-right">学习数据</div>
        </div>
      </div>
      <div class="plan-card">
        <div class="plan-card-bg"> </div>
        <div class="plan-card-wrapper">
          <div class="plan-card-up">
            <div class="plan-card-up-left">
              <div class="dic-name">JLPT-N1词汇 </div>
              <div class="plan-setting">
                <svg-icon name="icon-shezhi" font-size="14px" color="#587acb" />
                学习设置</div
              >
            </div>
            <div class="plan-card-up-right"> 查看词表</div>
          </div>
          <div class="plan-card-mid">
            <div class="plan-progress">
              <div class="plan-progress-percent">已完成9.3%</div>
              <div class="plan-progress-num">225/2416词</div>
            </div>
            <n-progress
              style="margin: 8px auto"
              type="line"
              :percentage="9.3"
              :show-indicator="false"
            />
            <divc class="plan-progress-tip">-已离线存储进度-</divc>
          </div>
          <div class="plan-card-down">
            <div class="learn">
              <div class="word-text">学习</div>
              <div class="word-num">15</div>
            </div>
            <div class="review">
              <div class="word-text">复习</div> <div class="word-num">45</div>
            </div>
            <div class="todo">
              <div class="word-text">未学</div> <div class="word-num">2032</div>
            </div>
          </div>
        </div>
      </div>
      <div class="learning-button"><n-button type="tertiary"> 继续学习 </n-button> </div>
      <div class="vip-service">
        <div class="layer1"
          ><div class="vip-service-left">VIP-SOGA日语学习APP</div>
          <div class="vip-service-right">开通</div>
        </div>
        <div class="layer2">
          <div class="advantage-text">高质量字典、vip背词词典</div>
          <div class="advantage-text">翻译文档下载</div>
          <div class="advantage-text">智能场景模拟</div>
        </div>
      </div></div
    >
  </div>
</template>
<script lang="ts" setup>
  defineProps<{ msg: string }>();
</script>

<style lang="less" scoped>
  .user-center {
    display: flex;
    justify-content: center;
    .user-info {
      width: 800px;
      margin-top: 30px;
      background: #ffffff;
      box-shadow: 0px 4px 4px 0px rgba(138, 138, 138, 0.25);
      border-radius: 6px 6px 6px 6px;
      &-up {
        display: flex;
        padding: 16px 16px 16px 34px;
        justify-content: space-between;
        &-left {
          display: flex;
          .user-text-info {
            margin-left: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .name {
              font-size: 18px;
              font-family: Noto Sans SC-Bold, Noto Sans SC;
              font-weight: bold;
              color: #8a8a8a;
            }
            .isVip {
            }
          }
        }
        &-right {
          font-size: 12px;
          color: #587acb;
          cursor: pointer;
          position: relative;
          right: -4px;
          top: -4px;
        }
      }
      &-down {
        display: flex;
        justify-content: space-evenly;
        font-weight: bold;
        color: #587acb;
        font-weight: 13px;
        height: 40px;
        align-items: center;
        background: #cfd8ef;
        border-radius: 0 0 6px 6px;
        &-left,
        &-right {
          cursor: pointer;
        }
        &-mid {
          font-size: 20px;
        }
      }
    }
    .plan-card {
      position: relative;
      width: 756px;
      margin-top: 30px;
      background: rgba(88, 122, 203, 0.2);
      padding: 16px 24px;
      border-radius: 6px 6px 6px 6px;

      &-bg {
        position: absolute;
        background: url('../../assets/img/user/bg1.png') no-repeat;
        background-size: 44%;
        background-position: right bottom;
        opacity: 0.3;
        width: 724px;
        height: 264px;
        right: 0;
        bottom: -66px;
      }

      &-wrapper {
        padding: 8px 14px;
        background: linear-gradient(
          125deg,
          rgba(255, 255, 255, 0.4) 0%,
          rgba(255, 255, 255, 0) 100%
        );
        box-shadow: 0px 8px 20px 0px rgba(138, 138, 138, 0.2);
        border-radius: 6px 6px 6px 6px;
        opacity: 1;
        border: 2px solid;
        border-image: linear-gradient(
            132deg,
            rgba(255, 255, 255, 1),
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 0),
            rgba(165, 184, 225, 0.3)
          )
          2 2;
        height: 182px;
      }
      &-up {
        display: flex;
        justify-content: space-between;
        color: #587acb;
        &-left {
          .dic-name {
            font-size: 18px;
            font-weight: bold;
          }
          .plan-setting {
            margin-top: 4px;
            font-size: 14px;
          }
        }
        &-right {
          position: relative;
          font-size: 12px;
          cursor: pointer;
          top: -4px;
          right: -4px;
        }
      }
      &-mid {
        .plan-progress {
          display: flex;
          justify-content: space-between;
          color: #587acb;
          margin: 4px auto;
          font-size: 13px;
        }
        .plan-progress-tip {
          display: flex;
          justify-content: center;
          margin: 4px auto;
          color: #587acb;
        }
      }
      &-down {
        display: flex;
        justify-content: space-evenly;
        color: #587acb;
        font-size: 16px;
        font-weight: bold;
      }
    }
    .learning-button {
      text-align: center;
      margin: 12px auto;
      margin-bottom: 20px;
      .n-button {
        background: #fff;
        width: 240px;
      }
    }
    .vip-service {
      width: 756px;
      background: #faf3e1;
      color: #cbaa63;
      padding: 16px 22px;
      font-size: 14px;
      border-radius: 6px;
      box-shadow: 0px 4px 4px 0px rgba(138, 138, 138, 0.25);
      .layer1 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: bold;
      }
      .layer2 {
        .advantage-text {
          font-size: 13px;
        }
      }
    }
  }
</style>
