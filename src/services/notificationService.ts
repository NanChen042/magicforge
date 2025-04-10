import { createApp, defineComponent, h, nextTick } from 'vue';
import MessageNotification from '../components/MessageNotification.vue';

type MessageType = 'success' | 'error' | 'warning' | 'info';

interface NotificationOptions {
  message: string;
  type: MessageType;
  duration?: number;
}

class NotificationService {
  notify(options: NotificationOptions): void {
    // 创建一个挂载点
    const container = document.createElement('div');
    document.body.appendChild(container);

    // 创建消息通知实例
    const app = createApp(MessageNotification, {
      message: options.message,
      type: options.type,
      duration: options.duration ?? 3000,
    });

    // 挂载组件
    const instance = app.mount(container);

    // 设置定时器在关闭后移除DOM
    setTimeout(() => {
      app.unmount();
      document.body.removeChild(container);
    }, (options.duration ?? 3000) + 300); // 额外300ms用于淡出动画
  }

  success(message: string, duration?: number): void {
    this.notify({ message, type: 'success', duration });
  }

  error(message: string, duration?: number): void {
    this.notify({ message, type: 'error', duration });
  }

  warning(message: string, duration?: number): void {
    this.notify({ message, type: 'warning', duration });
  }

  info(message: string, duration?: number): void {
    this.notify({ message, type: 'info', duration });
  }
}

export const notificationService = new NotificationService();
