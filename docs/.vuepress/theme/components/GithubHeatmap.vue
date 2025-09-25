<!-- GithubHeatmap.vue -->
<script setup>
import AboutMeText from './AboutMeText.vue'

// 替换成你的 GitHub 用户名
const username = 'zzyAJohn'
</script>

<template>
  <AboutMeText>
    <template #motto>
      <p class="about-me-card-title-normal">GitHub 贡献热力图</p>
      <div class="heatmap-container">
        <!-- 使用 ghchart 服务 -->
        <img
          class="github-heatmap"
          :src="`https://ghchart.rshah.org/3a5ccc/${username}`"
          :alt="`${username} 的 GitHub 贡献热力图`"
        />
      </div>
    </template>
  </AboutMeText>
</template>

<style scoped>
.heatmap-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
  overflow-x: auto; /* 避免图太宽溢出 */
}

.github-heatmap {
  width: 100%;
  max-width: 800px; /* 限制最大宽度 */
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.github-heatmap:hover {
  transform: scale(1.05); /* hover 时放大 */
}
</style>
