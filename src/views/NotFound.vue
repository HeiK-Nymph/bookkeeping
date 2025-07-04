<template>
  <div class="not-found">
    <h1>404 - 页面不存在</h1>
    <RouterLink to="/">返回首页</RouterLink>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* 视口高度 */
  margin: 0; /* 移除默认边距 */
}
</style>
