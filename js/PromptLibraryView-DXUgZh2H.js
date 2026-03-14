import{u as B}from"./vue-router-Bh3JqLP9.js";import{j as x,H as l,T as v,J as t,M as b,W as d,V as c,I as a,r as g,f as E,Q as A,X as w,ad as k,Y as j}from"./vue-BGE2YEpl.js";import{_ as f}from"./vue-helper-DlAUqK2U.js";import{u as I}from"./prompt-bvUg5Prd.js";import"./pinia-od8GhGVC.js";const z={key:0,class:"fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none"},$={class:"flex items-start justify-between p-6 border-b border-gray-200 rounded-t-xl bg-gray-50"},L={class:"text-xl font-semibold text-gray-900"},R={class:"p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar"},V={class:"mb-6"},T={class:"text-gray-600 text-lg"},H={class:"p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-200 transition-colors"},N={class:"flex mb-2 bg-white p-4 rounded-lg border border-gray-100"},U={class:"text-gray-800 whitespace-pre-wrap"},D={class:"p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-green-200 transition-colors"},W={class:"prose prose-sm max-w-none bg-white p-4 rounded-lg border border-gray-100"},Z={class:"text-gray-800 whitespace-pre-wrap"},J={key:0,class:"p-5 bg-gray-50 rounded-xl border border-gray-200 hover:border-purple-200 transition-colors"},Q={class:"text-gray-800 bg-white p-4 rounded-lg border border-gray-100"},Y={name:"PromptExampleModal"},q=x({...Y,props:{isOpen:{type:Boolean,default:!1},title:{type:String,default:""},description:{type:String,default:""},userPrompt:{type:String,default:""},sampleOutput:{type:String,default:""},analysis:{type:String,default:""}},emits:["close","use-prompt"],setup(r,{emit:m}){const h=r,u=m,s=()=>{u("close")},p=()=>{u("use-prompt",h.userPrompt),s()};return(_,e)=>r.isOpen?(a(),l("div",z,[t("div",{class:b(["fixed inset-0 bg-black transition-opacity",{"opacity-50":r.isOpen}]),onClick:s},null,2),t("div",{class:b(["relative w-full max-w-3xl mx-auto my-6 bg-white rounded-xl shadow-2xl transform transition-all",{"opacity-100 translate-y-0":r.isOpen,"opacity-0 translate-y-4":!r.isOpen}])},[t("div",$,[t("h3",L,d(r.title),1),t("button",{class:"p-1 ml-auto text-gray-500 hover:text-gray-800 transition-colors rounded-full hover:bg-gray-200",onClick:s},[...e[0]||(e[0]=[t("svg",{class:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"})],-1)])])]),t("div",R,[t("div",V,[t("p",T,d(r.description),1)]),t("div",H,[e[2]||(e[2]=t("h4",{class:"font-medium text-gray-700 mb-3 flex items-center"},[t("svg",{class:"w-5 h-5 mr-2 text-blue-500",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"})]),c(" 提示词 ")],-1)),t("div",N,[e[1]||(e[1]=t("span",{class:"font-bold text-blue-600 mr-3"},"USER",-1)),t("p",U,d(r.userPrompt),1)])]),t("div",D,[e[3]||(e[3]=t("h4",{class:"font-medium text-gray-700 mb-3 flex items-center"},[t("svg",{class:"w-5 h-5 mr-2 text-green-500",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"})]),c(" 样例输出 ")],-1)),t("div",W,[t("p",Z,d(r.sampleOutput),1)])]),r.analysis?(a(),l("div",J,[e[4]||(e[4]=t("h4",{class:"font-medium text-gray-700 mb-3 flex items-center"},[t("svg",{class:"w-5 h-5 mr-2 text-purple-500",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"})]),c(" 赏析 ")],-1)),t("p",Q,d(r.analysis),1)])):v("",!0)]),t("div",{class:"flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl"},[t("button",{class:"px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200",onClick:s}," 关闭 "),t("button",{class:"px-5 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center",onClick:p},[...e[5]||(e[5]=[c(" 前往测试 ",-1),t("svg",{class:"w-4 h-4 ml-2",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M13 7l5 5m0 0l-5 5m5-5H6"})],-1)])])])],2)])):v("",!0)}}),F=f(q,[["__scopeId","data-v-26c185da"]]),G={class:"min-h-screen bg-white font-sans antialiased"},X={class:"relative bg-gradient-to-b from-slate-50 to-white pt-24 pb-20 overflow-hidden border-b border-slate-100"},K={class:"relative z-10 max-w-6xl mx-auto px-6 text-center"},tt={class:"text-xl text-slate-600 max-w-2xl mx-auto mb-8"},et={class:"max-w-6xl mx-auto px-6 py-12"},nt={class:"flex items-center gap-2 mb-10 overflow-x-auto pb-2"},ot=["onClick"],rt={class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"},st=["onClick"],it={class:"flex items-center justify-between mb-4"},at={key:0,class:"w-3.5 h-3.5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},lt={key:1,class:"w-3.5 h-3.5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},dt={key:2,class:"w-3.5 h-3.5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},ut={class:"text-lg font-semibold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors"},pt={class:"text-sm text-slate-600 line-clamp-2 leading-relaxed"},ct=x({__name:"PromptLibrary",setup(r){const m=B(),h=I(),u=g(!1),s=g({title:"",description:"",userPrompt:"",sampleOutput:"",analysis:""}),p=g({代码改写:{title:"代码改写与优化",description:"识别代码中的性能瓶颈与逻辑漏洞，进行重构优化。",userPrompt:"下面这段的代码的效率很低，且没有处理边界情况。请先解释这段代码的问题与解决方法，然后进行优化：\n```python\ndef fib(n):\n    if n <= 2:\n        return n\n    return fib(n-1) + fib(n-2)\n```",sampleOutput:`### 问题分析
1. **效率低下**：原代码使用递归计算斐波那契数列，时间复杂度为 O(2^n)，存在大量重复计算。
2. **边界缺失**：未处理 n < 0 的情况，且 n=0 时逻辑可能不符合预期。

### 优化方案
使用**动态规划**（迭代法）或**尾递归**。这里提供迭代法版本，时间复杂度降为 O(n)。

### 优化后的代码
\`\`\`python
def fib_optimized(n: int) -> int:
    """
    计算第 n 个斐波那契数 (迭代版)
    """
    if not isinstance(n, int) or n < 0:
        raise ValueError("Input must be a non-negative integer")
    
    if n == 0: return 0
    if n == 1: return 1
    
    prev, curr = 0, 1
    for _ in range(2, n + 1):
        prev, curr = curr, prev + curr
        
    return curr
\`\`\``,analysis:"该示例展示了模型不仅能写代码，还能像资深工程师一样进行Code Review，指出时间复杂度问题并提供生产级代码。",category:"代码"},代码解释:{title:"复杂代码解释",description:"用通俗易懂的语言解释复杂的代码逻辑或正则表达式。",userPrompt:"请解释下面这段正则表达式的含义：\n`^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$`",sampleOutput:"这段正则表达式用于**验证电子邮件地址**的格式。我们可以将其拆解为三部分：\n\n1. **用户名部分** `^([a-zA-Z0-9_\\-\\.]+)`：\n   - `^`：表示字符串开始。\n   - `[...]`：允许大小写字母、数字、下划线、短横线和点。\n   - `+`：表示至少出现一次。\n\n2. **域名部分** `@([a-zA-Z0-9_\\-\\.]+)`：\n   - `@`：匹配邮箱中的 @ 符号。\n   - 后面的逻辑同上，匹配邮件服务器域名（如 gmail, outlook）。\n\n3. **顶级域名** `\\.([a-zA-Z]{2,5})$`：\n   - `\\.`：匹配实际的点号（.）。\n   - `[a-zA-Z]{2,5}`：匹配 2 到 5 位字母的后缀（如 .com, .cn, .org）。\n   - `$`：表示字符串结束。",analysis:"对于难以阅读的正则或生僻语法，AI 能将其拆解为自然语言，是学习新代码库的利器。",category:"代码"},代码生成:{title:"功能代码生成",description:"根据自然语言描述，生成完整的函数或组件代码。",userPrompt:"请生成一个 Python 函数，用于将用户上传的图片调整大小并转换为 WebP 格式。需要使用 Pillow 库。",sampleOutput:`\`\`\`python
from PIL import Image
import os

def convert_image_to_webp(input_path, output_path, max_width=800):
    """
    调整图片大小并转换为 WebP 格式
    """
    try:
        with Image.open(input_path) as img:
            # 计算新的高度，保持宽高比
            ratio = max_width / float(img.size[0])
            new_height = int((float(img.size[1]) * float(ratio)))
            
            # 调整大小
            img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
            
            # 保存为 WebP
            img.save(output_path, "WEBP", quality=85)
            print(f"成功转换: {output_path}")
            return True
    except Exception as e:
        print(f"转换失败: {e}")
        return False

# 使用示例
# convert_image_to_webp("photo.jpg", "photo.webp")
\`\`\``,analysis:"模型能够熟练使用第三方库（如 Pillow），并处理文件 I/O 和异常情况，生成的代码通常可直接运行。",category:"代码"},单元测试生成:{title:"单元测试生成",description:"为现有的函数生成测试用例，覆盖多种边界情况。",userPrompt:'请为以下 JavaScript 函数生成 Jest 测试用例，包含正常情况和边界情况：\n```javascript\nfunction divide(a, b) {\n  if (b === 0) throw new Error("Cannot divide by zero");\n  return a / b;\n}\n```',sampleOutput:`\`\`\`javascript
describe("divide function", () => {
  // 1. 正常情况
  test("should correctly divide two positive numbers", () => {
    expect(divide(6, 2)).toBe(3);
  });

  test("should handle negative numbers", () => {
    expect(divide(-6, 2)).toBe(-3);
    expect(divide(-6, -2)).toBe(3);
  });

  test("should handle decimals", () => {
    expect(divide(5, 2)).toBe(2.5);
  });

  // 2. 边界情况：被除数为0
  test("should return 0 when dividing 0", () => {
    expect(divide(0, 5)).toBe(0);
  });

  // 3. 异常情况：除数为0
  test("should throw error when dividing by zero", () => {
    expect(() => divide(5, 0)).toThrow("Cannot divide by zero");
  });
});
\`\`\``,analysis:"AI 非常擅长编写枯燥的测试代码，能自动考虑到正数、负数、小数以及除以零等异常场景。",category:"代码"},SQL查询优化:{title:"SQL 查询生成与优化",description:"将自然语言转换为复杂的 SQL 查询语句。",userPrompt:"我有一个 `orders` 表（id, user_id, amount, created_at）。请写一个 SQL 查询，找出最近 30 天内消费总额最高的前 10 名用户，并显示他们的总金额。",sampleOutput:`\`\`\`sql
SELECT 
    user_id,
    SUM(amount) as total_spent
FROM 
    orders
WHERE 
    created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
GROUP BY 
    user_id
ORDER BY 
    total_spent DESC
LIMIT 10;
\`\`\`
**解释**：
1. \`WHERE\` 子句筛选出最近 30 天的记录。
2. \`GROUP BY\` 按用户分组。
3. \`SUM\` 计算每个用户的总消费。
4. \`ORDER BY ... DESC\` 按金额从高到低排序。`,analysis:"能够准确理解时间范围（最近30天）和聚合需求（总额、Top 10），直接生成标准 SQL。",category:"代码"},内容分类:{title:"智能文本分类",description:"对用户反馈、文章或评论进行自动打标签和情感分析。",userPrompt:`请对以下用户评论进行情感分析（正面/负面/中性）和分类（产品/服务/物流）：
1. "快递太慢了，等了一周才到。"
2. "衣服质量不错，但是客服态度一般。"
3. "这是我买过最好用的耳机，音质绝了！"`,sampleOutput:`| 评论内容 | 情感倾向 | 类别 |
| :--- | :--- | :--- |
| 快递太慢了，等了一周才到。 | 🔴 负面 | 物流 |
| 衣服质量不错，但是客服态度一般。 | 🟡 中性 (混合) | 产品 & 服务 |
| 这是我买过最好用的耳机，音质绝了！ | 🟢 正面 | 产品 |`,analysis:"展示了 AI 处理非结构化数据的能力，并能以 Markdown 表格形式清晰输出，适合数据清洗场景。",category:"内容"},结构化输出:{title:"非结构化转 JSON",description:"从杂乱的文本中提取关键信息并格式化为 JSON。",userPrompt:`请从下面的简历文本中提取：姓名、技能列表、最近一家公司。输出为 JSON 格式。
文本："我是张三，有5年前端经验。擅长 Vue, React 和 TypeScript。之前在字节跳动工作，担任高级工程师。"`,sampleOutput:`\`\`\`json
{
  "name": "张三",
  "skills": ["Vue", "React", "TypeScript"],
  "experience": {
    "last_company": "字节跳动",
    "years": 5,
    "title": "高级工程师"
  }
}
\`\`\``,analysis:"对于需要从大量文本中抓取字段的业务（如简历解析、发票识别），这是最典型的应用场景。",category:"内容"},中英翻译专家:{title:"地道中英互译",description:"不仅是直译，更能处理成语、俚语和专业术语。",userPrompt:'请将这句话翻译成地道的英文，不要Chinglish："这件事让我觉得左右为难，真是进退维谷。"',sampleOutput:`**翻译 1 (口语化)**:
"I'm really **torn** about this. I feel like I'm stuck between a rock and a hard place."

**翻译 2 (正式)**:
"I find myself in a real **dilemma** regarding this matter."

**解析**：
- "左右为难" 可以用 "torn" (被撕裂的感觉) 表达。
- "进退维谷" 最经典的对应习语是 "between a rock and a hard place" (夹在岩石和硬地之间)。`,analysis:"展示了模型对语言文化背景的理解，能提供多种风格（口语/正式）的翻译选项。",category:"内容"},文案大纲生成:{title:"文章大纲生成",description:"快速搭建文章、报告或演讲的逻辑骨架。",userPrompt:"我要写一篇关于“远程办公利弊”的文章，请帮我列一个大纲，包含引言、正文（正反两面）、结论。",sampleOutput:`# 远程办公：自由的代价还是未来的趋势？

## 一、 引言
- 疫情后工作模式的转变
- 定义：什么是混合办公与全远程办公

## 二、 远程办公的红利 (利)
1. **灵活性**：平衡工作与生活 (WLB)
2. **效率**：减少通勤时间与办公室干扰
3. **人才库**：企业可招聘全球人才

## 三、 屏幕背后的挑战 (弊)
1. **沟通隔阂**：信息丢失与协作延迟
2. **孤独感**：团队归属感下降
3. **边界模糊**：工作时长无形中延长

## 四、 结论
- 远程办公不是银弹，适合自律性强的人
- 建议企业采用“混合办公模式”作为过渡`,analysis:"帮助创作者克服“空白页恐惧症”，迅速建立逻辑清晰的写作框架。",category:"内容"},周报生成:{title:"工作周报助手",description:"将碎片化的工作记录整理成条理清晰的周报。",userPrompt:`请根据以下记录生成一份周报：
1. 修复了登录页的bug
2. 跟进客户A的需求，还没定下来
3. 学习了新的AI工具
4. 下周打算做支付功能`,sampleOutput:`### 本周工作总结
**1. 重点项目推进**
- **系统维护**：成功修复登录页面 bug，提升用户访问稳定性。
- **客户跟进**：与客户 A 进行需求沟通，目前处于方案确认阶段，持续跟进中。

**2. 个人成长**
- 调研并学习了前沿 AI 工具，探索其在当前业务中的应用潜力。

### 下周工作计划
- **核心开发**：启动支付功能模块的开发工作。
- **需求落地**：敲定客户 A 的最终需求方案。`,analysis:"将口语化的流水账转化为职场专业的汇报语言，节省写周报的时间。",category:"内容"},角色扮演:{title:"沉浸式角色扮演",description:"设定特定人设，进行模拟面试、口语练习或情感咨询。",userPrompt:"请你扮演一位严厉的**资深面试官**。我正在应聘产品经理。请直接向我提问，不要说废话。第一个问题是什么？",sampleOutput:`（目光锐利，翻看着你的简历，头也不抬）

"我看你简历上写负责过用户增长。具体的增长数据是多少？你是通过什么核心策略带来的这些增长？请用数据说话，不要堆砌形容词。"`,analysis:"模型能够完美代入设定的人格（严厉、直接），非常适合用于模拟面试或语言陪练。",category:"创作"},诗歌创作:{title:"诗歌与歌词创作",description:"模仿特定风格创作古诗、现代诗或Rap歌词。",userPrompt:"请以“程序员的深夜”为主题，写一首现代诗，带点忧伤但又充满希望。",sampleOutput:`屏幕的光，是夜里唯一的月亮，
键盘的敲击声，代替了心跳的声响。

Bug 像躲在暗处的灰尘，
扫去一层，又落一层。
咖啡凉了，代码行数在长，
窗外的城市，已经睡得安详。

但我知道，
在第 1024 行的尽头，
有一个逻辑闭环的黎明，
正等着我去点亮。`,analysis:"模型不仅能押韵，还能理解意象（屏幕、Bug、1024），创作出引发共鸣的文学作品。",category:"创作"},小红书文案:{title:"爆款社交媒体文案",description:"生成带有 Emoji 和特定语气的社交媒体（小红书/朋友圈）文案。",userPrompt:"请帮我写一篇关于“周末去公园野餐”的小红书文案。语气要活泼少女心，多用Emoji。",sampleOutput:`✨周末摆烂指南 | 把春天装进篮子里🧺

集美们！今天终于去公园野餐啦～🌷
阳光+草地+三明治🥪，这也太治愈了吧！

📸拍照攻略：
建议穿浅色系裙子👗，配上碎花野餐布，随手一拍都是法式电影感！

虽然因为贪吃长胖了，但是快乐无价呀！😋
趁着天气好，赶紧拉上你的闺蜜冲鸭！🏃‍♀️💨

#野餐 #春游 #拍照姿势 #周末去哪儿 #治愈系风景`,analysis:"精准捕捉平台调性（Emoji、标签、语气），是内容运营的得力助手。",category:"创作"},宣传标语生成:{title:"Slogan 创意生成",description:"为产品或品牌构思朗朗上口、令人印象深刻的标语。",userPrompt:"我做了一款无糖气泡水，主打健康和口感好。请生成 3 个广告语。",sampleOutput:`1. **“0 糖 0 脂，气泡在舌尖跳舞。”** (强调口感与健康)
2. **“给身体减负，给快乐加气。”** (侧重情绪价值)
3. **“这一口，是夏天的自由。”** (营造意境)`,analysis:"从不同切入点（功能、情绪、场景）提供创意，激发营销灵感。",category:"创作"},模型提示词生成:{title:"Prompt 优化专家",description:"帮你把简单的需求转化为结构化、高质量的 Prompt。",userPrompt:"我想让 AI 帮我画一只猫，但不知道怎么描述比较好。请帮我生成一个详细的 Midjourney 提示词。",sampleOutput:`**Midjourney 提示词参考：**

\`A fluffy cute ragdoll cat, sitting by a rainy window, looking at raindrops, cinematic lighting, soft fur texture, 8k resolution, photorealistic, depth of field, cozy atmosphere --ar 16:9 --v 5.2\`

**中文解析：**
- **主体**：一只毛茸茸可爱的布偶猫
- **场景**：坐在下雨的窗边，看雨滴
- **光影/质感**：电影级光效，柔软的毛发质感
- **技术参数**：8k分辨率，照片级真实，景深效果，舒适的氛围\``,analysis:"这是一个“用 AI 指挥 AI”的高阶用法，能显著提升绘图或复杂任务的效果。",category:"创作"}}),_=g({代码改写:"..."}),e=g("全部");function P(i){e.value=i}const O=E(()=>{if(e.value==="全部")return p.value;const i={};return Object.entries(p.value).forEach(([o,n])=>{n.category&&n.category.includes(e.value)&&(i[o]=n)}),i});function C(i){p.value[i]?(s.value=p.value[i],u.value=!0):m.push({path:"/api-demo",query:{prompt:_.value[i]}})}function M(){u.value=!1}function S(i){h.setPromptText(i),m.push({path:"/api-demo"})}return(i,o)=>(a(),l("div",G,[t("div",X,[o[2]||(o[2]=t("div",{class:"absolute inset-0 overflow-hidden pointer-events-none"},[t("div",{class:"absolute -top-[40%] left-[20%] w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-[120px]"}),t("div",{class:"absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-violet-100/30 rounded-full blur-[100px]"}),t("div",{class:"absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"})],-1)),t("div",K,[o[0]||(o[0]=t("div",{class:"inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium mb-6"},[t("span",{class:"w-1.5 h-1.5 rounded-full bg-indigo-500"}),c(" Prompt Library ")],-1)),o[1]||(o[1]=t("h1",{class:"text-5xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight"}," 精选提示词模板库 ",-1)),t("p",tt,d(Object.keys(p.value).length)+" 个专业模板，覆盖代码、创作、内容三大场景 ",1)])]),t("div",et,[t("div",nt,[(a(),l(w,null,k(["全部","代码","创作","内容"],n=>t("button",{key:n,onClick:y=>P(n),class:b(["px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap",e.value===n?"bg-slate-900 text-white shadow-sm":"text-slate-600 hover:bg-slate-100"])},d(n),11,ot)),64))]),t("div",rt,[(a(!0),l(w,null,k(O.value,(n,y)=>(a(),l("div",{key:String(y),class:"group relative bg-white rounded-2xl border border-slate-200 p-6 transition-all duration-200 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100 cursor-pointer",onClick:bt=>C(String(y))},[t("div",it,[t("span",{class:b(["inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium",{"bg-blue-50 text-blue-700":n.category==="代码","bg-rose-50 text-rose-700":n.category==="创作","bg-emerald-50 text-emerald-700":n.category==="内容"}])},[n.category==="代码"?(a(),l("svg",at,[...o[3]||(o[3]=[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"},null,-1)])])):n.category==="创作"?(a(),l("svg",lt,[...o[4]||(o[4]=[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"},null,-1)])])):(a(),l("svg",dt,[...o[5]||(o[5]=[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"},null,-1)])])),c(" "+d(n.category),1)],2),o[6]||(o[6]=t("svg",{class:"w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9 5l7 7-7 7"})],-1))]),t("h3",ut,d(n.title),1),t("p",pt,d(n.description),1)],8,st))),128))])]),u.value?(a(),A(F,{key:0,"is-open":u.value,title:s.value.title,description:s.value.description,"user-prompt":s.value.userPrompt,"sample-output":s.value.sampleOutput,analysis:s.value.analysis,onClose:M,onUsePrompt:S},null,8,["is-open","title","description","user-prompt","sample-output","analysis"])):v("",!0)]))}}),mt=f(ct,[["__scopeId","data-v-b33abe79"]]),gt={class:"prompt-library-view"},ht=x({__name:"PromptLibraryView",setup(r){return(m,h)=>(a(),l("div",gt,[j(mt)]))}}),wt=f(ht,[["__scopeId","data-v-f99cd108"]]);export{wt as default};
