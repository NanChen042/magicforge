<template>
  <div class="progress-panel">
    <div class="main-quests">
      <h3 class="panel-title">主线进度</h3>
      <div class="progress-bars">
        <!-- 游戏成就进度 -->
        <div class="progress-item">
          <div class="progress-label">
            <span class="label">游戏成就</span>
            <span class="value">{{ storyProgress.mainQuests.gaming }}/100</span>
          </div>
          <div class="progress-bar-wrapper">
            <div class="progress-bar gaming" :style="{ width: `${storyProgress.mainQuests.gaming.toString()}%` }">
              <div class="progress-glow"></div>
            </div>
          </div>
        </div>

        <!-- 学习进度 -->
        <div class="progress-item">
          <div class="progress-label">
            <span class="label">学习进度</span>
            <span class="value">{{ storyProgress.mainQuests.study }}/100</span>
          </div>
          <div class="progress-bar-wrapper">
            <div class="progress-bar study" :style="{ width: `${storyProgress.mainQuests.study.toString()}%` }">
              <div class="progress-glow"></div>
            </div>
          </div>
        </div>

        <!-- 社交关系 -->
        <div class="progress-item">
          <div class="progress-label">
            <span class="label">社交关系</span>
            <span class="value">{{ storyProgress.mainQuests.social }}/100</span>
          </div>
          <div class="progress-bar-wrapper">
            <div class="progress-bar social" :style="{ width: `${storyProgress.mainQuests.social.toString()}%` }">
              <div class="progress-glow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="relationships">
      <h3 class="panel-title">重要关系</h3>
      <div class="relationship-cards">
        <div v-for="(relation, name) in storyProgress.relationships" :key="name" class="relationship-card" :class="getRelationshipClass(relation.affinity)">
          <div class="character-avatar">
            <img :src="getCharacterAvatar(name)" :alt="name">
          </div>
          <div class="character-info">
            <div class="character-name">{{ name }}</div>
            <div class="affinity-meter">
              <div class="affinity-bar" :style="{ width: `${Math.abs(relation.affinity).toString()}%` }"></div>
            </div>
            <div class="relationship-status">{{ getRelationshipStatus(name) }}</div>
          </div>
          <div class="recent-events" v-if="relation.events.length">
            <div class="event-title">最近事件：</div>
            <div class="event-list">
              <div v-for="(event, index) in relation.events.slice(-2)" :key="index" class="event-item">
                {{ event }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '../stores/game'
import type { StoryProgress } from '../stores/game'

const gameStore = useGameStore()
const storyProgress = computed(() => gameStore.storyProgress)

const getRelationshipClass = (affinity: number) => {
  if (affinity >= 80) return 'relationship-intimate'
  if (affinity >= 50) return 'relationship-friendly'
  if (affinity >= 20) return 'relationship-familiar'
  if (affinity >= -20) return 'relationship-neutral'
  if (affinity >= -50) return 'relationship-distant'
  return 'relationship-hostile'
}

const getRelationshipStatus = (character: string) => {
  return gameStore.getRelationshipStatus(character)
}

const getCharacterAvatar = (name: string) => {
  // 可以根据角色名返回对应的头像URL
  return `https://source.unsplash.com/100x100/?portrait,${name}&t=${name}`
}
</script>

<style scoped>
:root {
  --primary-color: #5b48da;
  --secondary-color: #ff5a5f;
  --accent-color: #ffc107;
  --dark-color: #292639;
  --medium-color: #3d3654;
  --light-color: #ffffff;
  --text-color: #292639;
  --text-light: #6e6a86;
  --text-dark: #1c1b29;
  --gray-100: #f4f2f8;
  --gray-200: #e9e7f0;
  --gray-300: #d2cfe3;
  --shadow-sm: 0 4px 6px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 6px 16px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.15);
  --transition-fast: all 0.2s ease;
  --transition-normal: all 0.3s ease;
}

.progress-panel {
  background: rgba(41, 38, 57, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 20px;
  color: var(--light-color);
  box-shadow: var(--shadow-md);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.panel-title {
  font-size: 1.2em;
  margin-bottom: 16px;
  color: var(--light-color);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
  padding-bottom: 8px;
}

.panel-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  border-radius: 2px;
}

.progress-bars {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.progress-item {
  width: 100%;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 0.9em;
}

.label {
  color: rgba(255, 255, 255, 0.8);
}

.value {
  font-weight: 500;
  color: var(--accent-color);
}

.progress-bar-wrapper {
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.progress-bar {
  height: 100%;
  border-radius: 4px;
  position: relative;
  transition: width 0.5s ease;
}

.progress-glow {
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3));
  animation: glow 1.5s infinite alternate;
}

.gaming {
  background: linear-gradient(90deg, var(--secondary-color), #ff8787);
}

.study {
  background: linear-gradient(90deg, var(--primary-color), #74c0fc);
}

.social {
  background: linear-gradient(90deg, var(--accent-color), #69db7c);
}

.relationships {
  margin-top: 24px;
}

.relationship-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.relationship-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: var(--transition-normal);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.relationship-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  background: rgba(255, 255, 255, 0.08);
}

.character-avatar {
  width: 60px;
  height: 60px;
  border-radius: 30px;
  overflow: hidden;
  border: 2px solid transparent;
  transition: var(--transition-normal);
}

.character-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.character-info {
  flex: 1;
}

.character-name {
  font-size: 1.1em;
  font-weight: bold;
  margin-bottom: 8px;
  color: var(--light-color);
}

.affinity-meter {
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 8px;
}

.affinity-bar {
  height: 100%;
  transition: width 0.5s ease;
}

.relationship-status {
  font-size: 0.9em;
  color: rgba(255, 255, 255, 0.7);
}

.recent-events {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 10px;
}

.event-title {
  font-size: 0.85em;
  margin-bottom: 6px;
  color: var(--accent-color);
  font-weight: 500;
}

.event-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.event-item {
  font-size: 0.85em;
  color: rgba(255, 255, 255, 0.8);
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
}

/* 不同关系状态的样式 */
.relationship-intimate .character-avatar {
  border-color: #ff6b6b;
  box-shadow: 0 0 10px rgba(255, 107, 107, 0.4);
}

.relationship-intimate .affinity-bar {
  background: linear-gradient(90deg, #ff6b6b, #ff8787);
}

.relationship-friendly .character-avatar {
  border-color: #5b48da;
  box-shadow: 0 0 10px rgba(91, 72, 218, 0.4);
}

.relationship-friendly .affinity-bar {
  background: linear-gradient(90deg, #5b48da, #74c0fc);
}

.relationship-familiar .character-avatar {
  border-color: #ffc107;
  box-shadow: 0 0 10px rgba(255, 193, 7, 0.4);
}

.relationship-familiar .affinity-bar {
  background: linear-gradient(90deg, #ffc107, #ffda5a);
}

.relationship-neutral .character-avatar {
  border-color: #adb5bd;
  box-shadow: 0 0 10px rgba(173, 181, 189, 0.4);
}

.relationship-neutral .affinity-bar {
  background: linear-gradient(90deg, #adb5bd, #ced4da);
}

.relationship-distant .character-avatar {
  border-color: #6c757d;
  box-shadow: 0 0 10px rgba(108, 117, 125, 0.4);
}

.relationship-distant .affinity-bar {
  background: linear-gradient(90deg, #6c757d, #868e96);
}

.relationship-hostile .character-avatar {
  border-color: #dc3545;
  box-shadow: 0 0 10px rgba(220, 53, 69, 0.4);
}

.relationship-hostile .affinity-bar {
  background: linear-gradient(90deg, #dc3545, #e35d6a);
}

@keyframes glow {
  0% {
    opacity: 0.3;
    transform: translateX(-5px);
  }

  100% {
    opacity: 0.8;
    transform: translateX(0);
  }
}

@media (max-width: 768px) {
  .relationship-cards {
    grid-template-columns: 1fr;
  }

  .relationship-card {
    padding: 12px;
  }

  .character-avatar {
    width: 50px;
    height: 50px;
  }
}
</style>
