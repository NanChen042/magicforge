import cloudbaseSDK from "@cloudbase/js-sdk";

export const cloudbase = cloudbaseSDK.init({
  env: import.meta.env.VITE_CLOUDBASE_ENV_ID,
  region: import.meta.env.VITE_CLOUDBASE_REGION,
  accessKey: import.meta.env.VITE_CLOUDBASE_ACCESS_KEY
});

/**
 * 调用云托管服务
 * @param {Object} options - 请求配置
 * @param {string} options.name - 云托管服务名称
 * @param {string} options.path - 请求路径
 * @param {string} options.method - 请求方法 (GET/POST/PUT/DELETE)
 * @param {Object} options.data - 请求数据
 * @param {Object} options.header - 请求头
 * @returns {Promise} 响应结果
 */
export const callContainer = async (options) => {
  const { name = "magicforge", path = "/", method = "POST", data = {}, header = {} } = options;
  
  return await cloudbase.callContainer({
    name,
    method,
    path,
    header: {
      "Content-Type": "application/json; charset=utf-8",
      ...header
    },
    data
  });
};
