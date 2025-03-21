import type { GameScene, StoryProgress } from '../stores/game'

interface Checkpoint {
  id: string;
  timestamp: number;
  sceneHistory: {
    type: string;
    description: string;
    dialog: string;
  }[];
  storyProgress: StoryProgress;
  currentScene?: GameScene;
  lastChoices: string[];
}

/**
 * 检查点服务
 * 用于保存和恢复游戏状态
 */
export class CheckpointService {
  private static readonly STORAGE_KEY = 'game_checkpoints';
  private static readonly MAX_CHECKPOINTS = 5;
  private static checkpoints: Map<string, Checkpoint> = new Map();

  /**
   * 初始化检查点服务
   */
  public static init(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        this.checkpoints = new Map(Object.entries(data));

        // 清理过期的检查点（超过24小时）
        const now = Date.now();
        for (const [id, checkpoint] of this.checkpoints.entries()) {
          if (now - checkpoint.timestamp > 24 * 60 * 60 * 1000) {
            this.checkpoints.delete(id);
          }
        }

        this.saveToStorage();
      }
    } catch (error) {
      console.error('初始化检查点服务失败:', error);
      this.checkpoints.clear();
    }
  }

  /**
   * 创建检查点
   */
  public static create(data: {
    sceneHistory: any[];
    storyProgress: StoryProgress;
    currentScene: GameScene;
    lastChoices: string[];
  }): string {
    const checkpointId = `cp_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    this.checkpoints.set(checkpointId, {
      timestamp: Date.now(),
      ...data
    });
    return checkpointId;
  }

  /**
   * 获取检查点
   */
  public static get(checkpointId: string): any {
    return this.checkpoints.get(checkpointId);
  }

  /**
   * 获取最近的检查点
   */
  public static getLatest(): Checkpoint | undefined {
    const checkpoints = Array.from(this.checkpoints.values())
      .sort((a, b) => b.timestamp - a.timestamp);
    return checkpoints[0];
  }

  /**
   * 删除检查点
   */
  public static delete(id: string): void {
    this.checkpoints.delete(id);
    this.saveToStorage();
  }

  /**
   * 清理所有检查点
   */
  public static clear(): void {
    this.checkpoints.clear();
    this.saveToStorage();
  }

  /**
   * 保存到本地存储
   */
  private static saveToStorage(): void {
    try {
      const data = Object.fromEntries(this.checkpoints);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('保存检查点失败:', error);
    }
  }

  /**
   * 生成唯一ID
   */
  private static generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  /**
   * 保存检查点
   * 用于流式处理中保存场景状态
   */
  public static async saveCheckpoint(scene: GameScene): Promise<string> {
    const checkpointId = `cp_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    this.checkpoints.set(checkpointId, {
      timestamp: Date.now(),
      scene
    });
    console.log('已创建检查点:', checkpointId);
    return checkpointId;
  }

  /**
   * 加载检查点
   * 用于流式处理中恢复场景状态
   */
  public static async loadCheckpoint(checkpointId: string): Promise<GameScene | null> {
    const checkpoint = this.checkpoints.get(checkpointId);
    if (!checkpoint) {
      console.log('检查点不存在:', checkpointId);
      return null;
    }

    console.log('已加载检查点:', checkpointId);
    return checkpoint.scene;
  }

  /**
   * 清除过期的检查点
   */
  public static cleanupExpiredCheckpoints(maxAgeInMinutes: number = 60): void {
    const now = Date.now();
    const maxAge = maxAgeInMinutes * 60 * 1000;

    let count = 0;
    this.checkpoints.forEach((value, key) => {
      if (now - value.timestamp > maxAge) {
        this.checkpoints.delete(key);
        count++;
      }
    });

    if (count > 0) {
      console.log(`已清除 ${count} 个过期检查点`);
    }
  }
}

export default CheckpointService;
