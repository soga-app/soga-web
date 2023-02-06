<template>
  <div class="learning-word">
    <!-- <div class="preview">
      <div><svg-icon name="icon-arrow-left-circle" color="#587acb" font-size="50px" /> </div>
      <div class="btn-word">前一张</div>
    </div> -->
    <div v-show="!showWordCard" class="learning-card">
      <div class="card-info">
        <div class="review">
          <div class="card-info-text">复习</div>
          <div class="card-info-num">{{
            reviewWord === 0 ? reviewWord : `${reviewStart}/${reviewWord}`
          }}</div>
        </div>
        <div class="learn">
          <div class="card-info-text">新学</div>
          <div class="card-info-num">{{ `${learnStart}/${learnWord}` }}</div>
        </div>
        <div class="time">
          <div class="card-info-text">学习时长</div>
          <div class="card-info-num">
            <TimeCount ref="TimeCountRef" />
            <!-- <template #default="slotProps">
                {{ slotProps.timeObj.second }}
              </template> -->
          </div>
        </div>
      </div>
      <div class="word-info" :style="{ marginTop: curWord ? '140px' : '50px' }">
        <div v-if="curWord" class="word-info-inner">
          <div class="word">
            {{ curWord?.word }} <span>[{{ curWord?.pianJm }}]</span></div
          >
          <div class="word-luomayin">{{ curWord?.luomayin }}</div>
          <div class="wordInfo-audio">
            <div class="wordInfo-audio-female">
              <svg-icon
                color="#e695bb"
                font-size="30px"
                name="icon-mic"
                @click="playAudio('female')"
              />
              <audio id="femaleAudio" :src="curWord?.female"></audio>
            </div>
            <div class="wordInfo-audio-male">
              <svg-icon
                color="#6483cf"
                font-size="30px"
                name="icon-mic"
                @click="playAudio('male')"
              />
              <audio id="maleAudio" :src="curWord?.male"></audio>
            </div> </div
        ></div>
        <template v-else>
          <list-loading :row="1" :has-padding="true" />
        </template>
      </div>
      <div class="card-btn" @click="passWordCard">
        <div class="btn-pass"
          ><div class="inner">
            <img :src="passImg" alt="" style="width: 100%; height: 100%" />
            <img :src="passImgText" alt="" class="inner-text" /> </div
        ></div>
        <div class="btn-check" @click="checkWordCard"
          ><div class="inner">
            <img :src="checkImg" alt="" style="width: 100%; height: 100%" />
            <img :src="checkImgText" alt="" class="inner-text" />
          </div>
        </div>
      </div>
      <!-- <div class="next">
      <div><svg-icon name="icon-arrow-right-circle" color="#587acb" font-size="50px" /></div>
      <div class="btn-word">后一张</div>
    </div> -->
    </div>
    <div v-show="showWordCard" class="word-card">
      <word-card v-if="curWord" :word-info="curWord" />
      <div class="bnt-word-next">
        <n-button style="width: 265px" strong secondary round type="primary" @click="nextWordCard"
          >下一个</n-button
        >
      </div>
    </div>
  </div>
  <n-modal
    v-model:show="showModal"
    preset="dialog"
    title="确认"
    content="小主你的单词还没学习/复习完，你确定要离开吗?"
    positive-text="确认"
    negative-text="取消"
    @positive-click="endLearning"
    @negative-click="showModal = false"
  />
  <n-modal v-model:show="showEndModal" :style="endModalStyle" :mask-closable="false">
    <div class="end-content">
      <div class="end-content-left"> <img :src="celebrateImg" class="end-content-left-img" /></div>
      <div class="end-content-right">
        <div class="end-header-title">Well&nbsp;Done !!!</div>
        <div style="margin-left: 16px"
          ><div>小主你真棒！</div>
          <div style="margin-bottom: 16px">坚持学习了5分钟！</div>
          <div style="margin-bottom: 16px"><span class="end-key">新词</span>15个</div>
          <div><span class="end-key">旧词</span>15个</div></div
        >
        <div class="end-content-right-btn">
          <n-button secondary round strong type="primary" @click="leaveLearning">完成打卡</n-button>
        </div>
      </div>
    </div>
  </n-modal>
</template>
<script setup lang="ts">
  import passImg from '@/assets/img/dictionary/pass.png';
  import checkImg from '@/assets/img/dictionary/check.png';
  import passImgText from '@/assets/img/dictionary/pass-text.png';
  import checkImgText from '@/assets/img/dictionary/check-text.png';
  import celebrateImg from '@/assets/img/dictionary/celebrate.png';
  import { ref, onMounted } from 'vue';
  import { onBeforeRouteLeave, useRouter } from 'vue-router';
  import api from '@/api';
  import { Dic } from '@/api/dictionary/index.d';
  import WordCard from './components/WordCard.vue';
  import { toDecimal } from '@/util';

  const router = useRouter();
  let showModal = ref(false);
  let goToRoute = ref('');
  let reviewWord = ref(0);
  let reviewStart = ref(0);
  let learnWord = ref(0);
  let learnStart = ref(0);
  let isLeave = ref(false);
  let reviewList: Array<Dic.LearnCardInfo> = [];
  let learnList: Array<Dic.LearnCardInfo> = [];
  let curWord = ref<Dic.WordInfo>();
  let showWordCard = ref(false);
  let processStart = ref(0);
  let dictId = ref(0);
  let processEnd = 0;

  let showEndModal = ref(false);
  const endModalStyle = ref({ width: '500px', borderRadius: '6px' });
  const TimeCountRef = ref<any>();

  onMounted(async () => {
    const res = await api.dictionary.getTodayWordList();
    reviewList = res.review as Array<Dic.LearnCardInfo>;
    learnList = res.learn as Array<Dic.LearnCardInfo>;
    reviewWord.value = res.review ? res.review.length : 0;
    learnWord.value = res.learn ? res.learn.length : 0;
    if (res.learn.length) {
      curWord.value = res.learn[0].wordDto;
      dictId.value = res.learn[0].dictId;
    }
    processEnd = reviewWord.value + learnWord.value;
    //完成今日学习任务的情况
    if (reviewWord.value === 0 && learnWord.value === 0) {
      showEndModal.value = true;
      showWordCard.value = true;
    }
  });
  onBeforeRouteLeave((to, from) => {
    showModal.value = true;
    goToRoute.value = to.name as string;
    if (!isLeave.value) return false;
    else return true;
  });

  const endLearning = (path?: string) => {
    if (path) goToRoute.value = path;
    showModal.value = false;
    isLeave.value = true;
    router.push({ name: goToRoute.value });
  };

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

  const checkWordCard = () => {
    showWordCard.value = true;
  };

  const passWordCard = () => {
    nextWord();
  };

  const nextWordCard = () => {
    showWordCard.value = false;
    nextWord();
  };

  const updateLearningRecord = async (
    dictId: number,
    reviewed: number,
    learned: number,
    learnTime: number
  ) => {
    const res = await api.dictionary.updateLearningRecord({
      dictId,
      reviewed,
      learned,
      learnTime
    });
  };

  const leaveLearning = () => {
    isLeave.value = true;
    router.push({ name: 'HomePage' });
  };

  const nextWord = async () => {
    if (processStart.value < reviewWord.value) {
      if (reviewList?.length) {
        let wordInfo = reviewList[++processStart.value];
        let tempFakeInfo = { word: wordInfo.word, female: wordInfo.voice };
        curWord.value = wordInfo.wordDto ? wordInfo.wordDto : tempFakeInfo;
        reviewStart.value++;
      }
    } else if (processStart.value === processEnd - 1) {
      showEndModal.value = true;
      const timeObj = TimeCountRef.value?.end();
      let second = timeObj.second,
        min = timeObj.minute,
        hour = timeObj.hour;
      let timeSpan = toDecimal(second / 60) + min + hour * 60;
      console.log('timeSpan is', timeSpan);
      let reviewed = reviewWord.value === 0 ? 0 : reviewList[reviewWord.value - 1].dictIndex;
      let learned = learnWord.value === 0 ? 0 : learnList[learnWord.value - 1].dictIndex;
      await updateLearningRecord(dictId.value, reviewed, learned, timeSpan);
    } else {
      if (learnList?.length) {
        let wordInfo = learnList[++processStart.value];
        let tempFakeInfo = { word: wordInfo.word, female: wordInfo.voice };
        curWord.value = wordInfo.wordDto ? wordInfo.wordDto : tempFakeInfo;
        learnStart.value++;
      }
    }
  };
</script>

<style lang="less">
  .learning-word {
    display: flex;
    justify-content: center;
    padding-top: 30px;
    align-items: center;
    .learning-card {
      margin: 0 36px;
      width: 400px;
      height: 560px;
      background: #ffffff;
      box-shadow: 0px 4px 4px 0px rgba(138, 138, 138, 0.25);
      border-radius: 4px;
      perspective: 1000px;
      transition: 0.5s ease-in-out;
      .card-info {
        padding: 12px 24px;
        background: #cfd8ef;
        display: flex;
        justify-content: space-evenly;
        .review,
        .learn,
        .time {
          width: 64px;
          max-width: 120px;
          text-align: center;
          color: #587acb;
        }
        .card-info-text {
          font-size: 16px;
          font-weight: bold;
        }
        .card-info-num {
          font-size: 14px;
        }
      }
      .card-btn {
        display: flex;
        justify-content: space-between;
        margin-top: 60px;
        padding: 0 24px;
        .btn-pass {
          cursor: pointer;
          width: 150px;
          height: 140px;
          background: #cfd8ef;
          box-shadow: 0px 4px 4px 0px rgba(138, 138, 138, 0.25);
          border-radius: 6px 6px 6px 6px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .btn-check {
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 150px;
          height: 140px;
          background: #feecf5;
          box-shadow: 0px 4px 4px 0px rgba(138, 138, 138, 0.25);
          border-radius: 6px 6px 6px 6px;
        }
        .inner {
          position: relative;
          width: 130px;
          height: 120px;
          background: linear-gradient(
            125deg,
            rgba(255, 255, 255, 0.4) 0%,
            rgba(255, 255, 255, 0) 100%
          );
          box-shadow: 0px 8px 20px 0px rgba(138, 138, 138, 0.2);
          border-radius: 6px 6px 6px 6px;
          opacity: 0.7;
          border: 1px solid;
          border-image: linear-gradient(
              132deg,
              rgba(255, 255, 255, 1),
              rgba(255, 255, 255, 0),
              rgba(255, 255, 255, 0),
              rgba(254, 236, 245, 1)
            )
            1 1;
        }
        .inner-text {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 90px;
          height: 26px;
          transform: translate(-50%, -50%);
        }
      }
      .word-info {
        margin-top: 140px;
        .word-info-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 121px;
        }
        .word {
          color: #8a8a8a;
          font-weight: bold;
          font-size: 16px;
          margin-bottom: 16px;
        }
        .word-luomayin {
          color: #8a8a8a;
          font-weight: bold;
          font-size: 20px;
          margin-bottom: 16px;
        }
        .wordInfo-audio {
          display: flex;
          align-items: center;
          &-female {
            margin-right: 16px;
            cursor: pointer;
          }
          &-male {
            cursor: pointer;
          }
        }
      }
    }
    .preview,
    .next {
      cursor: pointer;
      .btn-word {
        color: #587acb;
        width: 50px;
        text-align: center;
      }
    }
    .word-card {
      position: relative;
      width: 400px;
      background: #fff;
      height: 560px;
      .bnt-word-next {
        text-align: center;
        position: absolute;
        bottom: 24px;
        width: 100%;
      }
    }
  }
  .end-content {
    display: flex;
    width: 100%;
    padding: 16px 24px;
    background: #fff;
    background-image: url('@/assets/img/dictionary/string.png');
    background-size: 28% 50%;
    background-position: right top;
    background-repeat: no-repeat;
    &-left {
      width: 97px;
      position: relative;
      &-img {
        width: 100%;
        height: 95px;
        position: absolute;
        bottom: 10px;
      }
    }
    &-right {
      margin-left: 20px;
      margin-top: 32px;
      .end-header-title {
        color: #7e9ff1;
        font-size: 28px;
        font-weight: bold;
      }
      .end-key {
        display: inline-block;
        margin-right: 8px;
        color: #fff;
        padding: 1px 8px;
        background: #a9bced;
        border-radius: 12px;
      }
      &-btn {
        width: 282px;
        margin-top: 24px;
        text-align: center;
      }
    }
  }
</style>
