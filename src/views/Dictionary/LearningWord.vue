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
              <audio id="femaleAudio" :src="curWord?.female" preload="auto"></audio>
            </div>
            <div class="wordInfo-audio-male">
              <svg-icon
                color="#6483cf"
                font-size="30px"
                name="icon-mic"
                @click="playAudio('male')"
              />
              <audio id="maleAudio" :src="curWord?.male" preload="auto"></audio>
            </div> </div
        ></div>
        <template v-else>
          <list-loading :row="1" :has-padding="true" />
        </template>
      </div>
      <div class="card-btn">
        <div class="btn-pass" @click="passWordCard"
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
    <div v-show="showWordCard" class="word-card-wrap">
      <div class="word-card-self"> <word-card v-if="curWord" :word-info="curWord" /></div>
      <div class="bnt-word-next">
        <n-button style="width: 265px" strong secondary round type="primary" @click="nextWordCard"
          >下一个</n-button
        >
      </div>
    </div>
  </div>
  <LeaveModal
    :show-leave-modal="showLeaveModal"
    @end-learning="endLearning"
    @updateLeaveModal="showLeaveModal = false"
  />
  <EndModal
    :show-end-modal="showEndModal"
    :learn-time="timeSpan"
    @leave-learning="leaveLearning"
    @update-end-modal="showEndModal = false"
  />
  <n-modal
    v-model:show="showPlayAudioModal"
    :mask-closable="false"
    preset="dialog"
    title="确认"
    content="你确认"
    positive-text="确认"
    @positive-click="onPositiveClick"
  />
  <button id="test" style="display: none"> </button>
</template>
<script setup lang="ts">
  import passImg from '@/assets/img/dictionary/pass.png';
  import checkImg from '@/assets/img/dictionary/check.png';
  import passImgText from '@/assets/img/dictionary/pass-text.png';
  import checkImgText from '@/assets/img/dictionary/check-text.png';
  import { ref, onMounted, nextTick, onActivated } from 'vue';
  import { onBeforeRouteLeave, useRouter } from 'vue-router';
  import api from '@/api';
  import { Dic } from '@/api/dictionary/index.d';
  import WordCard from './components/WordCard.vue';
  import LeaveModal from './components/LeaveModal.vue';
  import EndModal from './components/EndModal.vue';
  import { toDecimal } from '@/util';

  const router = useRouter();
  let showLeaveModal = ref(false);
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
  let processStart = ref(1);
  let dictId = ref(0);
  let processEnd = 0;
  let firstAudioPlay = ref(true);
  let planFinished = ref(false);

  let showEndModal = ref(false);
  const TimeCountRef = ref<any>();
  let timeSpan = ref(0);
  let showPlayAudioModal = ref(false);

  const onPositiveClick = () => {
    playAudio('male');
  };

  onActivated(async () => {
    const res = await api.dictionary.getTodayWordList();
    reviewWord.value = res.review ? res.review.length : 0;
    learnWord.value = res.learn ? res.learn.length : 0;
    if (!reviewWord.value && !learnWord.value) {
      // 表示单词学习且复习完了
      window.$message.info('今日单词学习计划已经完成！');
      isLeave.value = true;
      planFinished.value = true;
      router.push({ name: 'HomePage' });
      return;
    }
    isLeave.value = false;
    TimeCountRef.value.start();
  });

  onMounted(async () => {
    const res = await api.dictionary.getTodayWordList();
    reviewList = res.review as Array<Dic.LearnCardInfo>;
    learnList = res.learn as Array<Dic.LearnCardInfo>;
    reviewWord.value = res.review ? res.review.length : 0;
    learnWord.value = res.learn ? res.learn.length : 0;
    if (!reviewWord.value && !learnWord.value) return;
    if (learnWord.value && !reviewWord.value) {
      //表示计划的最开始，只有学习单词的情况
      const tempFakeInfo = { word: res.learn[0].word, female: res.learn[0].voice };
      const wordDto = res.learn[0].wordDto;
      curWord.value = wordDto ? wordDto : tempFakeInfo;
      dictId.value = res.learn[0].dictId;
    } else {
      //表示计划的最终，只有复习单词的情况
      const tempFakeInfo = { word: res.review[0].word, female: res.review[0].voice };
      const wordDto = res.review[0].wordDto;
      curWord.value = wordDto ? wordDto : tempFakeInfo;
      dictId.value = res.learn[0].dictId;
    }
    processEnd = reviewWord.value + learnWord.value;
    //完成今日学习任务的情况
    if (reviewWord.value === 0 && learnWord.value === 0) {
      showEndModal.value = true;
      showWordCard.value = true;
    }
    showPlayAudioModal.value = true;
    // document.addEventListener('mousemove', () => {
    //   if (firstAudioPlay.value) {
    //     // const btn = document.getElementById('test');
    //     // btn?.click();
    //     playAudio('male');
    //     firstAudioPlay.value = false;
    //   }
    // });
  });

  onBeforeRouteLeave((to, from) => {
    if (!planFinished.value) showLeaveModal.value = true;
    goToRoute.value = to.name as string;
    if (!isLeave.value) return false;
    else return true;
  });

  const endLearning = (path?: string) => {
    if (path) goToRoute.value = path;
    showLeaveModal.value = false;
    isLeave.value = true;
    TimeCountRef.value?.end();
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
    console.log('调用了playAudio');
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
      //复习旧词中
      if (reviewList?.length) {
        let wordInfo = reviewList[processStart.value];
        let tempFakeInfo = { word: wordInfo.word, female: wordInfo.voice };
        curWord.value = wordInfo.wordDto ? wordInfo.wordDto : tempFakeInfo;
        reviewStart.value++;
      }
    } else if (processStart.value === processEnd) {
      // 学到最后一个单词了
      showEndModal.value = true;
      const timeObj = TimeCountRef.value?.end();
      let second = timeObj.second,
        min = timeObj.minute,
        hour = timeObj.hour;
      timeSpan.value = toDecimal(second / 60) + min + hour * 60;
      let reviewed = reviewWord.value === 0 ? 0 : reviewList[reviewWord.value - 1].dictIndex;
      let learned = learnWord.value === 0 ? 0 : learnList[learnWord.value - 1].dictIndex;
      await updateLearningRecord(dictId.value, reviewed, learned, timeSpan.value);
    } else {
      //复习完旧词了
      if (processStart.value === reviewWord.value) reviewStart.value++;
      // 学习新词中
      if (learnList?.length) {
        let wordInfo = learnList[processStart.value - reviewWord.value];
        let tempFakeInfo = { word: wordInfo.word, female: wordInfo.voice };
        curWord.value = wordInfo.wordDto ? wordInfo.wordDto : tempFakeInfo;
        learnStart.value++;
      }
    }
    nextTick(() => {
      playAudio('male');
    });

    processStart.value++;
  };
</script>

<style lang="less" scoped>
  .learning-word {
    display: flex;
    justify-content: center;
    padding-top: 30px;
    align-items: center;
    .learning-card {
      margin: 0 36px;
      width: 440px;
      height: 600px;
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
          width: 70px;
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
        margin-top: 90px;
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
    .word-card-wrap {
      position: relative;
      width: 440px;
      background: #fff;
      height: 600px;
      .word-card-self {
        overflow-y: auto;
        max-height: 525px;
      }
      .bnt-word-next {
        text-align: center;
        position: absolute;
        bottom: 24px;
        width: 100%;
      }
    }
  }
</style>
