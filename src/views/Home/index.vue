<template>
  <div class="home-wrapper home">
    <div class="home-content">
      <div class="home-left">
        <div class="home-left-up">
          <div class="everyday-card">
            <div v-if="wordDaily" class="everyday-card-inner">
              <div class="card-up">
                <div class="card-up-right" @click="goTo('Dictionary', { word: wordDaily.word })"
                  >点击跳转词典</div
                >
              </div>
              <div class="card-down">
                <div class="word">
                  <div class="word-text">
                    <span style="font-weight: bold">单词：</span> {{ wordDaily.word }}
                  </div>
                  <div class="word-audio">
                    <div class="word-audio-female">
                      <svg-icon
                        color="#e695bb"
                        font-size="16px"
                        name="icon-mic"
                        @click="playAudio('female')"
                      />
                      <audio id="femaleAudio" :src="wordDaily?.female"></audio>
                    </div>
                    <div class="word-audio-male">
                      <svg-icon
                        color="#6483cf"
                        font-size="16px"
                        name="icon-mic"
                        @click="playAudio('male')"
                      />
                      <audio id="maleAudio" :src="wordDaily?.male"></audio>
                    </div>
                  </div>
                </div>
                <div class="meaning">
                  <span style="font-weight: bold">释义：</span> {{ wordDaily.meaning }}
                </div>
              </div>
            </div>
            <template v-else> <list-loading :row="1"></list-loading></template>
          </div>
        </div>
        <div class="home-left-down">
          <div class="utility-wrapper">
            <div
              v-for="(item, index) in utilityList"
              :key="index"
              :style="{ marginRight: (index + 1) % 2 !== 0 ? '34px' : '0' }"
              :class="`utility-card card-bg-color-${item}`"
              @click="handleCardGo(item)"
            >
              <div :class="`utility-card-inner card-bg-image-${item}`">
                <span class="utility-card-text">{{ UtilityMap[item] }} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="planRecordList && planRecordList.length" class="home-right">
        <div class="word-record">
          <div class="record-num">
            <div class="record-num-title">打卡天数</div>
            <div class="record-num-info">{{ planRecordList.length }}</div>
          </div>
          <div class="calendar"><Calendar /> </div>
          <n-popover
            placement="right-start"
            trigger="click"
            :content-style="{ padding: '16px 24px' }"
          >
            <template #trigger>
              <div class="record-check-button" @click="timeLineModal = true">查看打卡记录</div>
            </template>
            <n-timeline size="medium">
              <n-timeline-item
                v-for="item in planRecordList"
                :key="item.createTime"
                type="info"
                :time="item.createTime"
                line-type="dashed"
              >
                <div class="record-info">
                  <div class="record-info-text"
                    ><div class="record-info-text-new"
                      >新词学习：<span class="record-info-text-color">{{ item.learnedNum }}个</span>
                    </div>
                    <div class="record-info-text-old"
                      >旧词复习：<span class="record-info-text-color"
                        >{{ item.reviewedNum }}个</span
                      >
                    </div></div
                  >
                  <div class="record-info-text"
                    >学习时长：<span class="record-info-text-color">{{
                      `${item.learnTime} min`
                    }}</span></div
                  >
                </div>
              </n-timeline-item>
            </n-timeline>
          </n-popover>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { readonly, onMounted, ref } from 'vue';
  import Calendar from './components/Calendar.vue';
  import { UtilityMap } from './index';
  import { useRouter } from 'vue-router';
  import api from '@/api';
  import { Dic } from '@/api/dictionary/index.d';

  const router = useRouter();

  let wordDaily = ref();
  let planRecordList = ref<Array<Dic.PlanRecordItem>>();

  let timeLineModal = ref(false);

  const utilityList = readonly(['translate', 'oraltrain', 'community', 'reciteword']);

  onMounted(async () => {
    wordDaily.value = await api.dictionary.getDailyWord();
    planRecordList.value = await api.dictionary.getPlanRecordList();
    const d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
  });

  function capitalizedFirstLetter(s: string) {
    let first = s[0];
    return first.toUpperCase() + s.slice(1);
  }
  function handleCardGo(path: string) {
    const pathName = capitalizedFirstLetter(path);
    goTo(pathName);
  }

  function goTo(path: string, query?: any) {
    router.push({ name: path, query });
  }

  function playAudio(type: 'female' | 'male') {
    let audio: HTMLAudioElement;
    switch (type) {
      case 'female':
        audio = document.getElementById('femaleAudio') as HTMLAudioElement;
        break;
      case 'male':
        audio = document.getElementById('maleAudio') as HTMLAudioElement;
        break;
    }
    audio.play();
  }
</script>

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
      left: 168px;
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
      left: 160px;
      top: 20px;
    }
  }

  .home-content {
    display: flex;
    justify-content: center;
  }
  .home {
    display: flex;
    padding-top: 28px;
    justify-content: center;
    &-left {
      width: 550px;
      .everyday-card {
        box-shadow: 0px 8px 40px 0px rgba(138, 138, 138, 0.2);
        border-radius: 4px;
        opacity: 1;
        background-color: #fff;
        background: url('../../assets/img/everyday-card-bg.png') no-repeat;
        background-size: cover;
        height: 164px;
        &-inner {
          padding: 12px 16px 24px 34px;
          color: #587acb;
        }
        .card-up {
          display: flex;
          justify-content: flex-end;
          &-right {
            margin-bottom: 38px;
            font-size: 14px;
            font-weight: 400;
            line-height: 21px;
            cursor: pointer;
            border: 1px solid #587acb;
            line-height: 24px;
            height: 24px;
            border-radius: 4px;
            padding: 1px 4px;
          }
        }
        .card-down {
          margin-left: 26px;
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
              display: flex;
              &-female {
                margin-right: 8px;
              }
            }
          }
          .meaning {
            font-weight: 400;
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
            width: 256px;
            height: 180px;
            margin-bottom: 38px;
            border-radius: 10px 10px 10px 10px;
            box-shadow: 0px 4px 6px 0px rgba(138, 138, 138, 0.25);
            &-inner {
              font-size: 18px;
              font-weight: bold;
              color: #707070;
              margin: 16px 18px;
              width: 220px;
              height: 144px;
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
        height: 538px;
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
  .record-info {
    &-text {
      color: #707070;
      font-size: 12px;
      display: flex;
      margin-bottom: 8px;
      &-color {
        color: rgb(239, 194, 70);
        font-weight: bold;
      }
      &-new {
        margin-right: 16px;
      }
    }
  }
</style>
