import type { GameLog } from '../stores/game'

// 同步配置
const SYNC_CONFIG = {
  // 同步间隔（毫秒）
  interval: 60000, // 1分钟
  // 同步API地址（实际项目中替换为真实API）
  apiUrl: 'https://api.example.com/giao-game/sync',
  // 重试次数
  maxRetries: 3,
  // 重试延迟（毫秒）
  retryDelay: 5000,
  // 是否启用自动同步
  autoSync: false
}

/**
 * 游戏数据同步服务
 */
export class SyncService {
  private static instance: SyncService
  private intervalId: number | null = null
  private retryCount = 0

  /**
   * 获取单例
   */
  public static getInstance(): SyncService {
    if (!SyncService.instance) {
      SyncService.instance = new SyncService()
    }
    return SyncService.instance
  }

  /**
   * 开始自动同步
   */
  public startAutoSync(syncCallback: () => Promise<boolean>): void {
    if (this.intervalId) {
      this.stopAutoSync()
    }

    if (SYNC_CONFIG.autoSync) {
      console.log(`开始自动同步服务，间隔: ${SYNC_CONFIG.interval}ms`)

      this.intervalId = window.setInterval(async () => {
        try {
          await syncCallback()
        } catch (error) {
          console.error('自动同步失败:', error)
        }
      }, SYNC_CONFIG.interval)
    }
  }

  /**
   * 停止自动同步
   */
  public stopAutoSync(): void {
    if (this.intervalId) {
      window.clearInterval(this.intervalId)
      this.intervalId = null
      console.log('自动同步服务已停止')
    }
  }

  /**
   * 同步日志到服务器（带重试机制）
   */
  public async syncLogsToServer(logs: GameLog[]): Promise<boolean> {
    try {
      console.log(`尝试同步 ${logs.length} 条日志记录...`)

      // 模拟API请求
      const success = await this.mockApiRequest(logs)

      if (success) {
        this.retryCount = 0
        return true
      } else {
        return this.handleSyncError('同步请求失败')
      }
    } catch (error) {
      return this.handleSyncError(`同步错误: ${error}`)
    }
  }

  /**
   * 处理同步错误（实现重试逻辑）
   */
  private async handleSyncError(message: string): Promise<boolean> {
    this.retryCount++

    if (this.retryCount <= SYNC_CONFIG.maxRetries) {
      console.warn(`${message}, 将在 ${SYNC_CONFIG.retryDelay}ms 后第 ${this.retryCount} 次重试...`)

      return new Promise((resolve) => {
        setTimeout(() => {
          // 此处应调用同步方法，但为避免递归问题，此示例仅返回false
          resolve(false)
        }, SYNC_CONFIG.retryDelay)
      })
    } else {
      console.error(`同步失败，已达最大重试次数(${SYNC_CONFIG.maxRetries})`)
      this.retryCount = 0
      return false
    }
  }

  /**
   * 模拟API请求（实际项目中替换为真实API调用）
   */
  private async mockApiRequest(logs: GameLog[]): Promise<boolean> {
    return new Promise((resolve) => {
      // 模拟网络请求
      setTimeout(() => {
        // 模拟80%的成功率
        const success = Math.random() > 0.2

        console.log(
          success
            ? `Mock API调用成功: ${logs.length}条日志已同步`
            : 'Mock API调用失败: 同步请求出错'
        )

        resolve(success)
      }, 1000)
    })
  }

  /**
   * 从服务器获取日志
   */
  public async fetchLogsFromServer(playerName: string): Promise<GameLog[] | null> {
    try {
      console.log(`尝试获取玩家 ${playerName} 的日志记录...`)

      // 模拟API请求
      await new Promise(resolve => setTimeout(resolve, 1000))

      // 实际项目中，应发起真实API请求:
      // const response = await fetch(`${SYNC_CONFIG.apiUrl}/logs?player=${playerName}`)
      // if (!response.ok) throw new Error('服务器响应错误')
      // const data = await response.json()
      // return data.logs

      // 为演示返回模拟数据
      console.log('模拟API调用成功，已获取日志')
      return []
    } catch (error) {
      console.error('从服务器获取日志失败:', error)
      return null
    }
  }
}

export default SyncService.getInstance()
