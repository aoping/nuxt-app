<template>
  <div class="js_article">
    <div class="rich_media_inner">
      <div class="rich_media_area_primary">
        <div class="rich_media_area_primary_inner">
          <div id="img-content">
            <h2 class="rich_media_title">{{topic.title}}</h2>
            <div class="rich_media_meta_list">
              <span class="rich_media_meta rich_media_meta_text">
                {{topic.author}}
              </span>
              <span class="rich_media_meta rich_media_meta_nickname">
                {{topic.accountName}}
              </span>
              <em class="rich_media_meta rich_media_meta_text">{{topic.meta.createdAt|getLastTimeStr(true)}}</em>
            </div>
            <div class="rich_media_content " v-html="topic.content">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
import {getTopic} from '@/store/services'
export default {
  layout: 'topic',
  async asyncData({ params }) {
    const res = await getTopic(params.id)
    let topicUser = {}
    if (res.success) {
      return { topic: res.data }
    }
  },
  data() {
    return {
      topic: null,
    }
  },
  components: {},
}
</script>

<style scoped>

.rich_media_inner {
    word-wrap: break-word;
    hyphens: auto;
}
.appmsg_skin_default .rich_media_area_primary {
    background-color: #fff;
}
@media screen and (min-width: 1024px) {
  .rich_media_area_primary {
    padding-top: 32px;
  }
}

.rich_media_area_primary {
    padding: 20px 16px 12px;
}
@media screen and (min-width: 1024px) {
  .rich_media_area_primary_inner, .rich_media_area_extra_inner {
    max-width: 677px;
    margin-left: auto;
    margin-right: auto;
  }
}

.rich_media_title {
    font-size: 22px;
    line-height: 1.4;
    margin-bottom: 14px;
}
.rich_media_meta_list {
    margin-bottom: 22px;
    line-height: 20px;
    font-size: 0;
    word-wrap: break-word;
    word-break: break-all;
}
.rich_media_meta_text {
    color: rgba(0,0,0,0.3);
}
.rich_media_meta {
    display: inline-block;
    vertical-align: middle;
    margin: 0 10px 10px 0;
    font-size: 15px;
    color:#576b95;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}
.rich_media_meta_nickname {
    position: relative;
}
.rich_media_meta {
    display: inline-block;
    vertical-align: middle;
    margin: 0 10px 10px 0;
    font-size: 15px;
    color:#576b95;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}
.rich_media_meta_text {
    color: rgba(0,0,0,0.3);
}

.rich_media_meta {
    display: inline-block;
    vertical-align: middle;
    margin: 0 10px 10px 0;
    font-size: 15px;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}
.rich_media_content {
    overflow: hidden;
    color: #333;
    font-size: 17px;
    word-wrap: break-word;
    -webkit-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
    text-align: justify;
    position: relative;
    z-index: 0;
}
.rich_media_content p{
  margin-bottom: 0;
}
</style>
<style>
p{
  margin-bottom: 0;
}
</style>
