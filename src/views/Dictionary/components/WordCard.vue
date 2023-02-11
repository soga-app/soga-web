<template>
  <div class="wordcard">
    <template v-if="!wordInfo">
      <list-loading :row="3" />
    </template>
    <div v-else class="word-layer">
      <div class="word-layer-first">
        <div class="wordInfo-word">{{ wordInfo.word }}</div>
        <div class="wordInfo-lmy">[{{ wordInfo.luomayin }}]</div>
        <div class="wordInfo-audio">
          <div class="wordInfo-audio-female">
            <svg-icon
              color="#e695bb"
              font-size="20px"
              name="icon-mic"
              @click="playAudio('female')"
            />
            <audio id="femaleAudio" :src="wordInfo.female"></audio>
          </div>
          <div class="wordInfo-audio-male">
            <svg-icon color="#6483cf" font-size="20px" name="icon-mic" @click="playAudio('male')" />
            <audio id="maleAudio" :src="wordInfo.male"></audio>
          </div>
          <div></div>
        </div>
      </div>
      <div class="word-layer-second">
        <div class="left" style="margin-right: 40px"
          ><div class="word-key">平假名</div> <div class="word-value">{{ wordInfo.pingJm }}</div>
        </div>
        <div class="right"
          ><div class="word-key">片假名</div> <div class="word-value">{{ wordInfo.pianJm }}</div>
        </div>
      </div>
      <div class="word-layer-meaning"
        ><div class="word-key">释义</div>
        <div class="word-value">{{ wordInfo.meaning }}</div>
      </div>
      <div class="word-remain" :style="{ marginBottom: wordInfo.jyc ? '14px' : '22px' }">
        <div class="word-key">近义词</div>
        <div class="word-value">
          <div v-if="wordInfo.jyc && wordInfo.jyc.length" class="word-list">
            <div
              v-for="(item, index) in wordInfo.jyc"
              :key="index"
              class="word-list-each"
              @click="handleSearch(item)"
              >{{ item }}</div
            >
          </div>
          <span v-else class="empty-data">暂无数据</span>
        </div>
      </div>
      <div class="word-remain" :style="{ marginBottom: wordInfo.xjc ? '14px' : '22px' }">
        <div class="word-key">形近词</div>
        <div class="word-value"
          ><div v-if="wordInfo.xjc && wordInfo.xjc.length" class="word-list">
            <div
              v-for="(item, index) in wordInfo.xjc"
              :key="index"
              class="word-list-each"
              @click="handleSearch(item)"
              >{{ item }}</div
            >
          </div>
          <span v-else class="empty-data">暂无数据</span>
        </div>
      </div>
      <div class="word-remain" :style="{ marginBottom: '0' }">
        <div class="word-key">双语例句</div>
        <div class="word-value">
          <div v-if="wordInfo.sentence && wordInfo.sentence.length" class="sent-list">
            <virtual-list-load
              v-slot="slotProps"
              :list-data="wordInfo.sentence"
              :estimated-item-size="52"
              height="400px"
            >
              <div class="sent-info">
                <div class="sent-info-left">
                  <div
                    class="sent-info-japan"
                    v-html="
                      getHighlight(
                        `${slotProps.index + 1}. ${slotProps.item.Japanese}`,
                        wordInfo.word
                      )
                    "
                  >
                  </div>
                  <div class="sent-info-china">{{ slotProps.item.Chinese }}</div>
                </div>
                <div class="sent-info-right">
                  <div class="sent-info-icon">
                    <svg-icon
                      color="#7f98d6"
                      font-size="16px"
                      name="icon-copy"
                      class="icon-copy"
                      @click="copy(`${slotProps.item.Japanese}\n${slotProps.item.Chinese}`)"
                    />
                    <svg-icon
                      color="#7f98d6"
                      font-size="16px"
                      name="icon-favorite"
                      class="icon-favorite"
                    />
                  </div>
                </div>
              </div>
            </virtual-list-load>
          </div>
          <span v-else class="empty-data">暂无数据</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Dic } from '@/api/dictionary/index.d';
  import useClipboard from 'vue-clipboard3';

  interface Props {
    wordInfo: Dic.WordInfo;
  }

  const emits = defineEmits(['searchWord']);
  const props = defineProps<Props>();

  // 关键词在例句中高亮
  function getHighlight(concent: string, keyword: string) {
    let replaceReg = new RegExp(keyword, 'g'); //正则
    let replaceString =
      '<span class="highlight-text" style="color: #587acb">' + keyword + '</span>'; //拼接
    let titleString: any = concent.replace(replaceReg, replaceString); //替换
    return titleString;
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

  function handleSearch(word: string) {
    emits('searchWord', word);
  }

  const { toClipboard } = useClipboard();
  const copy = async (copyText: string) => {
    try {
      await toClipboard(copyText);
      window.$message.success(`${copyText}已经成功复制到您的粘贴板！`);
    } catch (e) {
      console.error(e);
    }
    return { copy };
  };
</script>

<style lang="less" scoped>
  .wordcard {
    padding: 24px;
    // width: 100%;
    div[class^='word-layer-'] {
      display: flex;
      color: #8a8a8a;
      margin-bottom: 22px;
      align-items: center;
    }
    .word-remain {
      display: flex;
      margin-bottom: 22px;
    }
    .word-key {
      width: 74px;
      height: 26px;
      color: #fff;
      background: #587acb;
      border-radius: 4px 4px 4px 4px;
      font-size: 14px;
      margin-right: 20px;
      display: inline-block;
      text-align: center;
      line-height: 26px;
      flex-shrink: 0;
    }
    .word-value {
      width: 100%;
      display: inline-block;
      font-size: 14px;
      font-family: Noto Sans SC-Regular, Noto Sans SC;
      font-weight: 400;
      color: #8a8a8a;
      line-height: 21px;
      .word-list {
        display: flex;
        flex-wrap: wrap;
        margin-top: 4px;
        &-each {
          margin-right: 16px;
          margin-bottom: 8px;
          cursor: pointer;
          &:hover {
            color: #587acb;
          }
        }
      }
    }
    .sent-list {
      .sent-info {
        margin-bottom: 16px;
        display: flex;
        &-left {
          margin-right: 6px;
          &:hover {
            background-color: #5d80d016;
          }
        }
        &-japan {
          font-weight: 600;
        }
        &-china {
          margin-left: 18px;
        }
        &-icon {
          flex-shrink: 0;
          width: 36px;
          .icon-copy {
            cursor: pointer;
            margin-right: 4px;
            &:hover {
              color: #587acb;
            }
          }
          .icon-favorite {
            cursor: pointer;
          }
        }
      }
    }

    .word-layer-first {
      font-size: 18px;
      font-weight: bold;
      font-family: Noto Sans SC-Bold, Noto Sans SC;
      align-items: center;
      .wordInfo {
        &-word {
          margin-right: 40px;
          color: #8a8a8a;
        }
        &-lmy {
          color: #8a8a8a;
          margin-right: 22px;
        }
        &-audio {
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
    .word-layer-second {
      .left,
      .right {
        display: flex;
      }
    }
    .empty-data {
      line-height: 26px;
    }
  }
</style>
