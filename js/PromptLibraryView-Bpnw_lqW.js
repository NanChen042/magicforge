import{k as P,r as v,O as T,Q as L,L as _,T as E,M as z,x as d,z as g,y as e,C as a,R as w,H as I,J as o,c as H,F as S,G as A,D as j,E as B,B as R}from"./vue-BjPct76j.js";import{u as Q}from"./vue-router-BaucxNs6.js";import{_ as k}from"./vue-helper-DlAUqK2U.js";import{u as $}from"./prompt-BQx8eQPF.js";import"./pinia-DRdor8mY.js";const U={key:0,class:"relative w-full max-w-2xl bg-white rounded-md border border-zinc-200 shadow-xl overflow-hidden flex flex-col max-h-[85vh]"},F={class:"px-6 py-4 border-b border-zinc-200 bg-zinc-50/70 flex items-center justify-between"},V={class:"text-base font-bold text-zinc-900 tracking-tight"},K={class:"text-xs text-zinc-500 mt-0.5"},W={class:"p-6 overflow-y-auto space-y-5 text-left custom-scrollbar"},X={class:"space-y-2"},q={class:"flex items-center justify-between"},G={class:"bg-zinc-900 text-zinc-200 p-4 rounded-sm font-mono text-xs leading-relaxed overflow-x-auto border border-zinc-800 whitespace-pre-wrap"},J={class:"space-y-2"},Y={class:"bg-zinc-50 text-zinc-800 p-4 rounded-sm border border-zinc-200 text-xs leading-relaxed whitespace-pre-wrap"},Z={key:0,class:"p-3.5 bg-blue-50/50 border border-blue-200/70 rounded-sm text-xs space-y-1"},ee={class:"text-zinc-700 leading-relaxed"},te={class:"px-6 py-3.5 border-t border-zinc-200 bg-zinc-50/70 flex items-center justify-end gap-2.5"},ne=P({__name:"PromptExampleModal",props:{isOpen:{type:Boolean},title:{},description:{},userPrompt:{},sampleOutput:{},analysis:{}},emits:["close","use-prompt"],setup(i,{emit:y}){const x=i,l=y,c=v(!1),b=async()=>{if(x.userPrompt)try{await navigator.clipboard.writeText(x.userPrompt),c.value=!0,setTimeout(()=>{c.value=!1},2e3)}catch(p){console.error("复制失败:",p)}},h=()=>{l("use-prompt",x.userPrompt),l("close")};return(p,n)=>(o(),T(L,{to:"body"},[_(E,{"enter-active-class":"transition-opacity duration-200","enter-from-class":"opacity-0","enter-to-class":"opacity-100","leave-active-class":"transition-opacity duration-150","leave-from-class":"opacity-100","leave-to-class":"opacity-0"},{default:z(()=>[i.isOpen?(o(),d("div",{key:0,class:"fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs font-sans",onClick:n[2]||(n[2]=I(m=>l("close"),["self"]))},[_(E,{"enter-active-class":"transition-all duration-200 ease-out","enter-from-class":"opacity-0 scale-95","enter-to-class":"opacity-100 scale-100","leave-active-class":"transition-all duration-150 ease-in","leave-from-class":"opacity-100 scale-100","leave-to-class":"opacity-0 scale-95"},{default:z(()=>[i.isOpen?(o(),d("div",U,[e("div",F,[e("div",null,[e("h3",V,a(i.title),1),e("p",K,a(i.description),1)]),e("button",{onClick:n[0]||(n[0]=m=>l("close")),class:"p-1 rounded-sm text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 transition-colors cursor-pointer"},[...n[3]||(n[3]=[e("svg",{class:"w-4 h-4",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M6 18L18 6M6 6l12 12"})],-1)])])]),e("div",W,[e("div",X,[e("div",q,[n[5]||(n[5]=e("span",{class:"text-xs font-bold text-zinc-700 flex items-center gap-1.5 uppercase tracking-wide"},[e("span",{class:"w-1.5 h-1.5 rounded-full bg-blue-600"}),w(" Prompt 模板代码 ")],-1)),e("button",{onClick:b,class:"text-[11px] font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors cursor-pointer"},[n[4]||(n[4]=e("svg",{class:"w-3.5 h-3.5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"})],-1)),e("span",null,a(c.value?"已复制！":"复制提示词"),1)])]),e("div",G,a(i.userPrompt),1)]),e("div",J,[n[6]||(n[6]=e("span",{class:"text-xs font-bold text-zinc-700 flex items-center gap-1.5 uppercase tracking-wide"},[e("span",{class:"w-1.5 h-1.5 rounded-full bg-emerald-600"}),w(" 期待效果 / 样例输出 (Sample Output) ")],-1)),e("div",Y,a(i.sampleOutput),1)]),i.analysis?(o(),d("div",Z,[n[7]||(n[7]=e("span",{class:"font-bold text-blue-700 block"},"提示词专家解析：",-1)),e("p",ee,a(i.analysis),1)])):g("",!0)]),e("div",te,[e("button",{onClick:n[1]||(n[1]=m=>l("close")),class:"px-4 py-2 text-xs font-semibold text-zinc-700 bg-white border border-zinc-200 rounded-sm hover:bg-zinc-100 transition-colors cursor-pointer"}," 关闭 "),e("button",{onClick:h,class:"px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-sm shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"},[...n[8]||(n[8]=[e("span",null,"前往智能对话测试",-1),e("svg",{class:"w-3.5 h-3.5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M14 5l7 7m0 0l-7 7m7-7H3"})],-1)])])])])):g("",!0)]),_:1})])):g("",!0)]),_:1})]))}}),se=k(ne,[["__scopeId","data-v-42d580f6"]]),re={class:"min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-zinc-50 to-zinc-100/60 font-sans text-zinc-900 pb-16 relative"},oe={class:"relative pt-12 pb-10 overflow-hidden border-b border-zinc-200/80 bg-white/70 backdrop-blur-xs"},ae={class:"relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center"},ie={class:"text-sm text-zinc-500 max-w-xl mx-auto leading-relaxed"},le={class:"relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6"},de={class:"flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-3.5 rounded-md border border-zinc-200/90 shadow-2xs"},ce={class:"flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 custom-scrollbar"},pe=["onClick"],ue={class:"relative w-full md:w-72 shrink-0"},me={key:0,class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"},xe=["onClick"],be={class:"flex items-center justify-between mb-3"},ve={class:"text-base font-bold text-zinc-900 mb-1.5 group-hover:text-blue-600 transition-colors"},fe={class:"text-xs text-zinc-500 line-clamp-2 leading-relaxed mb-4"},ye={key:1,class:"bg-white rounded-md border border-zinc-200 p-12 text-center text-zinc-400 text-xs"},ge=P({__name:"PromptLibrary",setup(i){const y=Q(),x=$(),l=v(!1),c=v(""),b=v("全部"),h=["全部","代码开发","架构设计","数据分析","学术科研","写作创作","产品运营"],p=v({title:"",description:"",userPrompt:"",sampleOutput:"",analysis:""});function n(r){switch(r){case"代码开发":return"bg-blue-50 text-blue-700 border border-blue-200/60";case"架构设计":return"bg-purple-50 text-purple-700 border border-purple-200/60";case"数据分析":return"bg-cyan-50 text-cyan-700 border border-cyan-200/60";case"学术科研":return"bg-indigo-50 text-indigo-700 border border-indigo-200/60";case"写作创作":return"bg-amber-50 text-amber-700 border border-amber-200/60";case"产品运营":return"bg-emerald-50 text-emerald-700 border border-emerald-200/60";default:return"bg-zinc-50 text-zinc-700 border border-zinc-200/60"}}const m=v({代码重构与性能调优:{title:"代码重构与性能调优",description:"识别算法中的瓶颈与边界风险，将 O(N^2) 复杂度重构为 O(N log N)。",userPrompt:`下面这段 Python 代码在处理大数组时会导致超时与内存溢出，请指出瓶颈并重构：
\`\`\`python
def find_pairs(nums, target):
    res = []
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                res.append((nums[i], nums[j]))
    return res
\`\`\``,sampleOutput:`### 1. 问题定位
- **双重循环瓶颈**：嵌套循环使得算法的时间复杂度为 O(N^2)，当元素量达到 10^5 时会产生十亿次比较导致超时。
- **重复元素未去重**：如果输入存在重复数字，会输出大量重复元组。

### 2. 优化方案（哈希表匹配）
使用集合/字典存储遍历过的元素，将查找匹配项的时间复杂度降低为 O(1)，总体时间复杂度降为 O(N)。

\`\`\`python
def find_pairs_optimized(nums: list[int], target: int) -> list[tuple[int, int]]:
    seen = set()
    result = set()
    
    for num in nums:
        complement = target - num
        if complement in seen:
            # 保证元组顺序递增以便去重
            pair = (min(num, complement), max(num, complement))
            result.add(pair)
        seen.add(num)
        
    return list(result)
\`\`\``,analysis:"提示词展示了高级工程师式的 Code Review 逻辑，要求 AI 给出复杂度分析、风险点并提供生产级替代方案。",category:"代码开发"},TypeScript类型体操:{title:"TypeScript 复杂类型收窄",description:"构建严密的类型推导范型，提供无敌的类型安全保障。",userPrompt:"请用 TypeScript 编写一个条件工具类型 `DeepReadonly<T>`，能够递归地将对象及其深层属性、数组和函数参数转为不可变 readonly 类型。",sampleOutput:`\`\`\`typescript
type DeepReadonly<T> = T extends Function | boolean | number | string | null | undefined
  ? T
  : T extends Array<infer U>
  ? ReadonlyArray<DeepReadonly<U>>
  : T extends Map<infer K, infer V>
  ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
  : T extends Set<infer M>
  ? ReadonlySet<DeepReadonly<M>>
  : { readonly [P in keyof T]: DeepReadonly<T[P]> };
\`\`\`

**关键机制解释**：
1. **基础类型终止递归**：利用元组/原始类型三元判断防止陷入无限递归陷阱。
2. **内置容器特化处理**：专门处理 Map、Set 及 Array 泛型展开。`,analysis:"考验模型对 TypeScript 高级类型建模（条件类型、模式匹配 infer 和映射类型）的精确控制。",category:"代码开发"},Rust并发生命周期调试:{title:"Rust 所有权与生命周期排错",description:"分析并发环境下 Borrow Checker 的报错原因并给出无锁化解决方案。",userPrompt:'我在 Rust 中使用多线程共享状态时出现了 `borrowed value does not live long enough` 报错，请解析其根因并给出安全实现：\n```rust\nlet data = vec![1, 2, 3];\nstd::thread::spawn(move || {\n    println!("{:?}", data);\n});\n```',sampleOutput:"### 根因分析\n1. `std::thread::spawn` 要求的闭包声明周期为 `'static'`，即便使用了 `move` 关键字，如果外层存在动态引用的作用域竞争仍无法自动通过所有权转换。\n2. **标准解决方案**：使用 `std::sync::Arc` 进行原子引用计数共享，或者在作用域闭包中使用 `std::thread::scope`（Rust 1.63+ 稳定版）。\n\n### 推荐写法 (std::thread::scope)\n```rust\nlet data = vec![1, 2, 3];\n\nstd::thread::scope(|s| {\n    s.spawn(|| {\n        println!(\"Thread 1 read: {:?}\", data);\n    });\n});\n```",analysis:"帮助 Rust 开发者快速突破编译器的借用检查器（Borrow Checker）阻碍。",category:"代码开发"},高并发分布式缓存:{title:"高并发缓存击穿与雪崩设计",description:"设计百万级 QPS 下的 Redis 多级缓存与防击穿防雪崩架构。",userPrompt:"我们是一个电商热销商品秒杀系统，秒杀启动瞬间 QPS 预计从 1k 飙升至 50w，请设计一份应对缓存击穿（Hotkey）与缓存雪崩（Avalanche）的系统架构设计方案。",sampleOutput:"### 1. 热点 Key 击穿（Hot Key Breakdown）方案\n- **本地二级缓存**：借助 Caffeine / Go-cache 构建 Node.js/Java 本地内存热点一级缓存，使用 `SingleFlight` / `Mutex Lock` 控制打到 Redis 的并发并发数。\n- **逻辑过期 + 异步重建**：Key 物理不过期，在 Value 中封装 `expire_at` 逻辑字段，检测过期时异步开线程更新。\n\n### 2. 缓存雪崩（Avalanche）防范\n- **随机 TTL 抖动**：基础存活时长设为 2h + 随机 0-15min 随机偏移量，避免集中失效。\n- **多活冗余集群与熔断降级**：配置 Sentinel / Hystrix 熔断兜底，触发 80% 压测临界点时直接返回静态兜底数据。",analysis:"从方案设计、降级策略到代码锁控制，提供资深系统架构师级别的整体设计视角。",category:"架构设计"},RESTful与GraphQL标准建模:{title:"RESTful API & GraphQL 架构规约",description:"制定规范的 API 幂等性、统一错误码及类型安全层。",userPrompt:"我们正在重构企业级 SaaS 系统的 API 接口层，请帮助设计一套包含：幂等键控制、RFC 7807 统一标准错误结构、以及状态码划分的标准规范。",sampleOutput:`### RFC 7807 统一响应规范
\`\`\`json
{
  "type": "https://api.example.com/errors/RESOURCE_LOCKED",
  "title": "资源当前已被占用",
  "status": 409,
  "detail": "文档 #1024 正在被用户 A 编辑，暂无法提交修改",
  "instance": "/v1/documents/1024/lock",
  "code": "ERR_DOC_LOCKED"
}
\`\`\`

### 幂等性（Idempotency）规范
- POST / PUT 请求需在 Request Header 中携带 \`X-Idempotency-Key: uuid\`。
- 服务端利用 Redis \`SETNX\` 锁定 10 秒，在完成操作后将结果缓存 24 小时。`,analysis:"规范化大型团队的 API 设计语言，提升前端与后端联调效率。",category:"架构设计"},复杂SQL漏斗分析:{title:"用户转化漏斗与留存分析 SQL",description:"使用 SQL 窗口函数处理多阶段转化率与流失计算。",userPrompt:'我们有一个用户行为表 `user_events` (user_id, event_name, event_time)。请写一个高效 SQL 计算 7 天内按顺次触发"注册" -> "浏览商品" -> "下单支付"的单用户完整转化漏斗。',sampleOutput:`\`\`\`sql
WITH user_funnel AS (
  SELECT 
    user_id,
    MAX(CASE WHEN event_name = 'register' THEN event_time END) AS reg_time,
    MAX(CASE WHEN event_name = 'view_item' THEN event_time END) AS view_time,
    MAX(CASE WHEN event_name = 'checkout' THEN event_time END) AS pay_time
  FROM user_events
  WHERE event_time >= NOW() - INTERVAL 7 DAY
  GROUP BY user_id
)
SELECT 
  COUNT(reg_time) AS step1_registered,
  COUNT(CASE WHEN view_time > reg_time THEN 1 END) AS step2_viewed,
  COUNT(CASE WHEN pay_time > view_time THEN 1 END) AS step3_paid,
  ROUND(COUNT(CASE WHEN pay_time > view_time THEN 1 END) * 100.0 / COUNT(reg_time), 2) AS overall_conversion_rate
FROM user_funnel;
\`\`\``,analysis:"直接生成具有工业界实践价值的数据分析 SQL 模版，避免低效的大表 Join 操作。",category:"数据分析"},Pandas数据清洗与探索性分析:{title:"Pandas EDA 缺失值与方差提取",description:"对乱序数据集进行自动异常点剔除与特征变量标准化。",userPrompt:"请写一个 Python Pandas 数据处理脚本，对包含了 Null 值和异常极大值的用户消费数据表进行自动清洗与标准化。",sampleOutput:`\`\`\`python
import pandas as pd
import numpy as np

def clean_and_normalize(df: pd.DataFrame) -> pd.DataFrame:
    # 1. 缺失值插补 (使用中位数)
    df['amount'] = df['amount'].fillna(df['amount'].median())
    
    # 2. IQR 盖帽法处理极端异常值
    Q1 = df['amount'].quantile(0.25)
    Q3 = df['amount'].quantile(0.75)
    IQR = Q3 - Q1
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR
    
    df['amount_clipped'] = np.clip(df['amount'], lower_bound, upper_bound)
    
    # 3. Z-Score 标准化
    df['amount_zscore'] = (df['amount_clipped'] - df['amount_clipped'].mean()) / df['amount_clipped'].std()
    return df
\`\`\``,analysis:"展示了完整数据建模流水线（缺失填充 -> 盖帽法 -> Z-score），适合机器学习前期预处理。",category:"数据分析"},顶级期刊论文Abstract提炼:{title:"IEEE/Nature 学术论文 Abstract 提炼",description:"以三段论学术语言输出强逻辑性的研究突破阐述。",userPrompt:`请帮我将以下关于“基于 Transformer 的时间序列预测模型”的研究实验总结，改写为符合 IEEE 顶级会议风格的标准学术 Abstract（摘要）：
实验亮点：提出了新的稀疏注意力机制，在 4 个真实数据集上 MSE 降低了 14%，训练速度提升 2.3 倍。`,sampleOutput:"Addressing the dual challenges of high computational complexity and long-term dependency degradation in time-series forecasting, this paper proposes **SparseFormer**, an efficient Transformer-based architecture. By introducing a novel dynamic sparse attention mechanism, our method reduces memory overhead while preserving critical temporal contexts. Extensive experiments across four benchmark datasets demonstrate that SparseFormer achieves a **14% reduction in Mean Squared Error (MSE)** and a **2.3x speedup in training throughput** compared to state-of-the-art baselines.",analysis:"标准的学术英语造句格式，突出“问题背景 -> 核心创新点 -> 实验数据突破”。",category:"学术科研"},ArXiv前沿论文文献评述:{title:"ArXiv 前沿论文创新点对比分析",description:"快速提炼论文理论框架与研究方法的 Baseline 对比。",userPrompt:"请帮我梳理大语言模型中 Reasoning (推理能力) 的两条技术路线：Chain-of-Thought (CoT) 与 Process Reward Models (PRM) 的机制差异、训练成本与应用场景。",sampleOutput:`| 维度 | Chain-of-Thought (CoT) | Process Reward Models (PRM) |
| :--- | :--- | :--- |
| **核心机制** | 在 Prompt 中引入逐步推导示例，依靠 LLM 内置上下文补全推理步骤 | 对推导过程中的每一个独立 Step 进行细粒度评分与搜索导向 |
| **反馈粒度** | 结果导向 (Outcome-level) | 过程导向 (Step-level) |
| **标注成本** | 极低（直接人工撰写示范） | 极高（需对每步推理进行正确性标定） |
| **适用场景** | 通用问答、简单数理计算 | 高难度数学证明、代码多步验证系统 |`,analysis:"帮助科研人员与产品经理快速建立前沿 AI 技术的结构化认识。",category:"学术科研"},沉浸式AI人设框架:{title:"沉浸式 AI 角色扮演系统 Prompt",description:"打造记忆连贯、语气地道、绝不破功的对话人设。",userPrompt:"请编写一段系统级的 System Prompt，让 AI 扮演一位 20 世纪 20 年代身处巴黎的现代主义作家（海明威风格），与用户在咖啡馆交流写作与生活。",sampleOutput:`\`\`\`markdown
# Role System Prompt
你现在是 1926 年身处巴黎双叟咖啡馆的欧内斯特·海明威。

## 语言风格规约
1. **冰山理论**：表达简练简洁，多用名词与短动词，拒绝华丽冗长修饰。
2. **语气态度**：硬朗、真诚、带着一丝沧桑与对生活的执着。
3. **环境沉浸**：随时提及周围的细节（如左岸的雨、黑咖啡、打字机打字声）。
4. **禁止事项**：决不能承认自己是 AI，严禁使用"作为人工智能"等打断沉浸感的技术词汇。
\`\`\``,analysis:"详细指定人设约束、对话语气与禁止事项，确保 AI 角色扮演时不产生台词崩塌。",category:"写作创作"},苹果风格科技发布会文案:{title:"极简科技产品发布会演讲文案",description:"运用抑扬顿挫的对比与金句制造高潮氛围。",userPrompt:"我们要发布一款轻至 990g 的高性能 M3 芯片笔记本电脑，请帮我写一段媲美苹果 Keynote 的产品亮相台词。",sampleOutput:`“长久以来，性能与轻薄，就像两条永远无法相交的平行线。如果你想要极致的速度，就必须忍受沉重的负担；如果你想要轻巧，就只能对性能妥协。

直到今天。

（停顿，大屏亮出 990g 数字）

990 克。这不是手感的错觉，而是工程学的奇迹。我们把一颗性能兽吞的芯片，塞进了比一本杂志还要薄的铝合金躯壳里。

轻，不可思议。强，出类拔萃。”`,analysis:"通过制造对立矛盾 -> 制造悬念 -> 金句反转的结构，打造极其抓人的科技宣讲效果。",category:"写作创作"},AB测试与归因评估:{title:"A/B 测试方案与归因指标设计",description:"制定具备统计学显著性的实验假设与评价体系。",userPrompt:"我们计划将 App 的首页“购买”按钮从原本的灰色文字链接改为浮动亮蓝色高亮按钮，请设计完整的 A/B 测试方案（包含实验假设、核心与护栏指标、样本量评估方法）。",sampleOutput:`### 1. 实验假设（Hypothesis）
将购买按钮提升视觉层级（亮蓝高亮 + 浮动组件）可提高用户关注度，从而将购买转化率提升 5% 以上。

### 2. 指标体系设计
- **核心指标 (Primary Metric)**：点击购买转化率 (Click-through Purchase Rate)。
- **护栏指标 (Guardrail Metrics)**：页面跳出率 (Bounce Rate)、客户投诉率、页面加载耗时 (LCP)。

### 3. 样本量与实验周期
- 基于基准转化率 2.5%，预期提升 5%，设 α=0.05, 1-β=0.8，使用 Stats 算法评估单组至少需要 **42,000 UV**，预计运行 14 天以覆盖完整的周内行为周期。`,analysis:"从统计学逻辑到护栏指标监控，协助产品经理打造严谨无漏洞的实验设计方案。",category:"产品运营"},PRD需求规格说明书生成:{title:"标准 PRD 需求规格说明书模板",description:"快速生成包含交互分支、异常路径与验收标准的规格文档。",userPrompt:"我们要开发一个“手机号一键登录”的功能，请帮我生成一份包含正常流、异常流及验收标准（AC）的专业 PRD 模版。",sampleOutput:`### 1. 功能概述
实现用户通过运营商 SDK 一键获取本机号码完成快速注册/登录，提升转化率。

### 2. 用户主流程 (Happy Path)
1. 用户点击“一键登录”。
2. 客户端调用运营商 SDK 获取 Token。
3. 服务端校验 Token 成功，自动完成登录并跳转首页。

### 3. 异常流程 (Exception Path)
- **蜂窝网络未开启**：降级弹窗提示“请开启蜂窝网络”并切为短信验证码登录。
- **超时（>3000ms）**：自动静默降级至手机验证码模式。

### 4. 验收标准 (Acceptance Criteria)
- [ ] 仅使用 Wi-Fi 时能自动识别并降级。
- [ ] 登录成功率在 98.5% 以上。`,analysis:"避免需求遗漏，帮产品经理快速搭建完备的交互与异常测试用例逻辑。",category:"产品运营"}});function O(r){b.value=r}const C=H(()=>{let r=m.value;if(b.value!=="全部"){const t={};Object.entries(r).forEach(([s,u])=>{u.category===b.value&&(t[s]=u)}),r=t}if(c.value.trim()){const t=c.value.toLowerCase().trim(),s={};Object.entries(r).forEach(([u,f])=>{(f.title.toLowerCase().includes(t)||f.description.toLowerCase().includes(t)||u.toLowerCase().includes(t)||f.category.toLowerCase().includes(t))&&(s[u]=f)}),r=s}return r});function N(r){m.value[r]&&(p.value=m.value[r],l.value=!0)}function M(){l.value=!1}function D(r){x.setPromptText(r),y.push({path:"/api-demo"})}return(r,t)=>(o(),d("div",re,[t[6]||(t[6]=e("div",{class:"absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60"},null,-1)),e("div",oe,[e("div",ae,[t[1]||(t[1]=e("div",{class:"inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-blue-50 text-blue-600 border border-blue-200/70 text-xs font-semibold mb-4 shadow-2xs"},[e("span",{class:"w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"}),w(" 提示词模板库 ")],-1)),t[2]||(t[2]=e("h1",{class:"text-3xl sm:text-4xl font-extrabold text-zinc-900 mb-3 tracking-tight"}," 提示词范例工坊 ",-1)),e("p",ie," 精选 "+a(Object.keys(m.value).length)+" 个高价值专业领域 Prompt 范例与深度逻辑解析，支持一键发送至智能对话框测试 ",1)])]),e("div",le,[e("div",de,[e("div",ce,[(o(),d(S,null,A(h,s=>e("button",{key:s,onClick:u=>O(s),class:R(["px-3.5 py-1.5 rounded-sm text-xs font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0",b.value===s?"bg-blue-600 text-white shadow-2xs":"text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"])},a(s),11,pe)),64))]),e("div",ue,[j(e("input",{"onUpdate:modelValue":t[0]||(t[0]=s=>c.value=s),type:"text",placeholder:"搜索提示词标题或关键词...",class:"w-full bg-zinc-50 text-zinc-900 text-xs py-2 pl-8 pr-3 rounded-sm border border-zinc-200 focus:border-blue-600 focus:bg-white focus:outline-none transition-all"},null,512),[[B,c.value]]),t[3]||(t[3]=e("svg",{class:"w-4 h-4 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})],-1))])]),Object.keys(C.value).length>0?(o(),d("div",me,[(o(!0),d(S,null,A(C.value,(s,u)=>(o(),d("div",{key:String(u),class:"group relative bg-white rounded-md border border-zinc-200/90 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500 hover:shadow-xs cursor-pointer flex flex-col justify-between",onClick:f=>N(String(u))},[e("div",null,[e("div",be,[e("span",{class:R(["inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-[11px] font-bold",n(s.category)])},a(s.category),3),t[4]||(t[4]=e("svg",{class:"w-4 h-4 text-zinc-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9 5l7 7-7 7"})],-1))]),e("h3",ve,a(s.title),1),e("p",fe,a(s.description),1)]),t[5]||(t[5]=e("div",{class:"pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-400 font-medium group-hover:text-blue-600 transition-colors"},[e("span",null,"点击查看范例与测试"),e("span",{class:"font-semibold text-xs"},"查看范例 →")],-1))],8,xe))),128))])):(o(),d("div",ye,' 未找到与 "'+a(c.value)+'" 匹配的提示词范例 ',1))]),l.value?(o(),T(se,{key:0,"is-open":l.value,title:p.value.title,description:p.value.description,"user-prompt":p.value.userPrompt,"sample-output":p.value.sampleOutput,analysis:p.value.analysis,onClose:M,onUsePrompt:D},null,8,["is-open","title","description","user-prompt","sample-output","analysis"])):g("",!0)]))}}),he=k(ge,[["__scopeId","data-v-8f4e59f9"]]),_e={class:"prompt-library-view"},we=P({__name:"PromptLibraryView",setup(i){return(y,x)=>(o(),d("div",_e,[_(he)]))}}),Se=k(we,[["__scopeId","data-v-f99cd108"]]);export{Se as default};
