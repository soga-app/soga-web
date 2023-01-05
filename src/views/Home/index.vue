<script lang="ts" setup>
  import { readonly } from 'vue';
  import Calendar from './components/Calendar.vue';
  import { UtilityMap } from './index';
  import { useRouter } from 'vue-router';
  const router = useRouter();

  const utilityList = readonly(['translate', 'oraltrain', 'community', 'reciteword']);

  function goTo(path: 'Dictionary' | 'Translate' | 'Oraltrain' | 'Community' | 'Reciteword') {
    router.push({ name: path });
  }
</script>

<template>
  <div class="home-wrapper home">
    <div class="home-content">
      <div class="home-left">
        <div class="home-left-up">
          <div class="everyday-card">
            <div class="card-up">
              <div class="card-up-left">每日一记</div>
              <div class="card-up-right" @click="goTo('Dictionary')">点击跳转词典</div>
            </div>
            <div class="card-down">
              <div class="word">
                <div class="word-text">がおわる</div>
                <div class="word-audio">
                  <svg-icon name="icon-laba" color="#fff" />
                </div>
              </div>
              <div class="meaning">终了，结束 </div>
            </div>
          </div>
        </div>
        <div class="home-left-down">
          <div class="utility-wrapper">
            <div
              v-for="(item, index) in utilityList"
              :key="index"
              :style="{ marginRight: (index + 1) % 2 !== 0 ? '74px' : '0' }"
              :class="`utility-card card-bg-color-${item}`"
            >
              <div :class="`utility-card-inner card-bg-image-${item}`">
                <span class="utility-card-text">{{ UtilityMap[item] }} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="home-right">
        <div class="word-record">
          <div class="record-num">
            <div class="record-num-title">打卡天数</div> <div class="record-num-info">15</div>
          </div>
          <div class="calendar"><Calendar /> </div>
          <div class="record-check-button">查看打卡记录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
  @bgColorSet: {
    translate: #fff4d5;
    oraltrain: #eae4fe;
    community: #e8efff;
    reciteword: #feecf5;
  };
  each(@bgColorSet,{ .card-bg-color-@{key}{ background-color:@value; }}) .home-wrapper {
    background: rgba(242, 242, 242, 0.8);
    min-height: calc(100vh - 53px);
  }
  .card-bg-image-translate {
    background: url('../../assets/img/utility-card-bg1.png') no-repeat;
    background-size: contain;
    margin-left: 100px;
    .utility-card-text {
      position: relative;
      left: 210px;
      top: 75px;
    }
  }
  .card-bg-image-oraltrain {
    background: url('../../assets/img/utility-card-bg2.png') no-repeat;
    background-size: 90%;
    background-position: right bottom;
    .utility-card-text {
      position: relative;
      left: 10px;
      top: 10px;
    }
  }
  .card-bg-image-community {
    background: url('../../assets/img/utility-card-bg3.png') no-repeat;
    background-size: 70%;
    background-position: right bottom;
    .utility-card-text {
      position: relative;
      left: 10px;
      top: 10px;
    }
  }

  .card-bg-image-reciteword {
    background: url('../../assets/img/utility-card-bg4.png') no-repeat;
    background-size: contain;
    .utility-card-text {
      position: relative;
      left: 190px;
      top: 20px;
    }
  }

  .home-content {
    display: flex;
    justify-content: center;
  }
  .home {
    display: flex;
    padding: 28px 96px;
    &-left {
      width: 698px;
      .everyday-card {
        padding: 12px 16px 24px 34px;
        background: rgba(88, 122, 203, 0.3);
        box-shadow: 0px 8px 40px 0px rgba(138, 138, 138, 0.2);
        border-radius: 4px;
        opacity: 1;

        .card-up {
          display: flex;
          justify-content: space-between;
          &-left {
            font-size: 16px;
            font-weight: bold;
            line-height: 33px;
          }
          &-right {
            font-size: 14px;
            font-weight: 400;
            line-height: 21px;
            cursor: pointer;
          }
        }
        .card-down {
          margin-left: 52px;
          .word {
            display: flex;
            align-items: center;
            margin-bottom: 6px;
            &-text {
              font-size: 15px;
              line-height: 28px;
            }
            &-audio {
              margin-left: 8px;
              cursor: pointer;
            }
          }
          .meaning {
            font-weight: 400;
            color: #ffffff;
            line-height: 28px;
          }
        }
      }
      &-down {
        margin-top: 24px;
        .utility-wrapper {
          display: flex;
          flex-wrap: wrap;
          .utility-card {
            cursor: pointer;
            width: 312px;
            height: 219px;
            margin-bottom: 38px;
            border-radius: 10px 10px 10px 10px;
            box-shadow: 0px 4px 6px 0px rgba(138, 138, 138, 0.25);
            &-inner {
              font-size: 18px;
              font-weight: bold;
              color: #707070;
              margin: 16px 18px;
              width: 275px;
              height: 189px;
              box-shadow: 0px 8px 20px 0px rgba(138, 138, 138, 0.2);
              border-radius: 6px 6px 6px 6px;
              opacity: 1;
              border: 2px solid;
              border-image: linear-gradient(
                  132deg,
                  rgba(255, 255, 255, 1),
                  rgba(255, 255, 255, 0),
                  rgba(255, 255, 255, 0),
                  rgba(210, 204, 248, 0.4)
                )
                2 2;
            }
          }
        }
      }
    }
    &-right {
      margin-left: 60px;
      .word-record {
        height: 578px;
        background: rgba(88, 122, 203, 0.1);
        box-shadow: 0px 4px 4px 0px rgba(143, 142, 142, 0.25);
        border-radius: 10px 10px 10px 10px;
        opacity: 1;
        padding: 24px 20px;
        .record-num {
          margin-top: 16px;
          color: #6178b0;
          line-height: 22px;
          font-weight: bold;
          margin-bottom: 40px;
          &-title {
            font-size: 18px;
            text-align: center;
          }
          &-info {
            margin-top: 10px;
            font-size: 17px;
            text-align: center;
          }
        }
        .record-check-button {
          margin: 0 auto;
          margin-top: 40px;
          display: flex;
          justify-content: center;
          width: 244px;
          height: 36px;
          line-height: 36px;
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
              rgba(210, 204, 248, 0.4)
            )
            2 2;
          font-weight: bold;
          color: #6178b0;
          cursor: pointer;
        }
      }
    }
  }
</style>
