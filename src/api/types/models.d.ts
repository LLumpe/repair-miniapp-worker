/* eslint-disable */
// @ts-nocheck
// generated by free-swagger-client
// @see https://www.npmjs.com/package/free-swagger-client

export interface Admin {
  // 头像
  avatarUrl?: string;
  // 管理员管辖区所在市
  city?: string;
  // 管理员管辖区
  district?: string;
  // 管理员ID
  id?: number;
  // 姓名
  name?: string;
  // 当前页
  pageNo?: number;
  // 每页条数
  pageSize?: number;
  password?: string;
  // 管理员管辖区所在省
  province?: string;
  // 注册时间
  registerTime?: string;
  // 管理员角色
  role?: string;
  // 管理员角色ID
  roleId?: number;
  // 性别
  sex?: number;
  // 用户状态（1为启用，2为停用）
  state?: number;
  userName?: string;
}

export interface AdminRefreshToken {
  // refreshToken
  refreshToken?: string;
}

export interface AdminUpdateFamilyAvatar {
  // 头像Url
  avatarUrl?: string;
  // 志愿者信息ID
  id?: string;
}

export interface AdminUpdateVolunteerAvatar {
  // 头像Url
  avatarUrl?: string;
  // 志愿者信息ID
  id?: string;
}

export interface Banner {
  // 公告描述
  description?: string;
  // ID
  id?: number;
  // 公告ID
  noticeId?: number;
  // 发布人
  publisher?: string;
  // Banner生成时间
  time?: string;
  // 公告标题
  title?: string;
  // 图片地址
  url?: string;
}

export interface BindVolunteerInformation {
  // 身份证号
  IDCard?: string;
  // 姓名
  name?: string;
}

export interface CancelCase {
  // 案件ID(int)
  caseId?: string;
  // 结束案件状态
  state?: string;
}

export interface Case {
  // 详细地址
  address?: string;
  // 市
  city?: string;
  // 案件发生地距自己的距离
  distance?: number;
  // 区
  district?: string;
  // 家属
  family?: Family;
  // 家属ID
  familyId?: number;
  // 案件ID
  id?: number;
  // 走失点纬度
  latitude?: number;
  // 走失点经度
  longitude?: number;
  // 走失时间
  lostTime?: string;
  oldMan?: OldMan;
  // 老人信息ID
  oldManId?: number;
  // 其它信息
  others?: string;
  // 当前页
  pageNo?: number;
  // 每页条数
  pageSize?: number;
  // 位置名
  place?: string;
  // 省
  province?: string;
  // 案件开始时间
  startTime?: string;
  // 案件状态（1为正在进行，2为已找到，3为已归档,4为已取消）
  state?: number;
  // 志愿者-案件信息
  volunteerCase?: VolunteerCase;
  // 志愿者ID
  volunteerId?: number | null;
}

export interface ConfirmResult {
  // 人脸记录ID
  faceId?: string;
  // 确认结果，3为成功，4为失败
  state?: string;
}

export interface DeleteOldManId {
  // 老人信息ID
  id?: string;
}

export interface Face {
  // ID
  id?: number;
  // 照片地址
  imgUrl?: string;
  // 老人信息(含案件信息)
  oldMan?: OldMan;
  // 老人ID
  oldManId?: number;
  // 比对结果
  result?: number;
  // 状态(1为比对结果小于80%，2为大于等于80%但家属未确认，3为确认成功，4为确认失败)
  state?: number;
  // 时间
  time?: Timestamp;
  // 志愿者ID
  volunteerId?: number;
}

export interface FaceIdentification {
  // 照片地址
  imgUrl?: string;
}

export interface Family {
  // 头像
  avatarUrl?: string;
  // 城市
  city?: string;
  // 国家
  country?: string;
  // 区
  district?: string;
  // 家属ID
  id?: number;
  // 姓名
  name?: string;
  // 昵称
  nickName?: string;
  // 当前页
  pageNo?: number;
  // 每页条数
  pageSize?: number;
  // 手机号
  phone?: string;
  // 省份
  province?: string;
  // 注册时间
  registerTime?: string;
  // 性别
  sex?: number;
  // 账号状态
  state?: number;
}

export interface FamilyAvatarUrl {
  // 头像链接
  avatarUrl?: string;
}

export interface FamilyInformation {
  // 短信验证码
  code?: string;
  // 手机号
  phone?: string;
}

export interface FamilyLoginCode {
  // 从微信获取的code
  code?: string;
}

export interface FamilyRefreshToken {
  // refreshToken
  refreshToken?: string;
}

export interface FamilyUserinfo {
  // 加密字符串
  encryptedData?: string;
  // 从微信获取的iv
  iv?: string;
}

export interface IsOldMan {
  // 老人照片
  imgUrl?: string;
}

export interface Notice {
  // 内容
  content?: string;
  // 描述
  description?: string;
  // 是否展示（1为展示，2为不展示）
  display?: number;
  // ID
  id?: number;
  // 当前页
  pageNo?: number;
  // 每页条数
  pageSize?: number;
  // 发布人
  publisher?: string;
  // 发布人ID
  publisherId?: number;
  // 面向角色
  roleId?: number;
  // 时间
  time?: string;
  // 标题
  title?: string;
}

export interface OldMan {
  // 详细地址
  address?: string;
  // 出生日期
  birthDate?: string;
  // 城市
  city?: string;
  // 创建时间
  createdAt?: string;
  // 残疾信息
  disability?: string;
  // 区
  district?: string;
  // 家属ID
  familyId?: number;
  // 身高
  height?: number;
  id?: number;
  idcard?: string;
  // 证件照
  identificationPhoto?: string;
  // 生活照
  lifePhoto?: string;
  // 姓名
  name?: string;
  // 常去地点
  offerPlace?: string;
  // 其他体貌特征
  otherFeature?: string;
  otherIllness?: string;
  // 其他信息
  others?: string;
  // 联系电话
  phone?: string;
  // 省份
  province?: string;
  // 是否老年痴呆
  senileDementia?: number;
  // 性别
  sex?: number;
  // 修改时间
  updatedAt?: string;
  // 体重
  weight?: number;
}

export interface Page<T> {
  // 数据
  data?: T[];
  // 当前页
  pageNo?: number;
  // 总页数
  pageNum?: number;
  // 每页条数
  pageSize?: number;
  // 数据总数
  totalCount?: number;
}

export interface VolunteerInformation {
  // 详细地址
  address?: string;
  // 城市
  city?: string;
  // 国家
  country?: string;
  // 区
  district?: string;
  gender?: string;
  // ID
  id?: number;
  idcard?: string;
  // 姓名
  name?: string;
  // 当前页
  pageNo?: number;
  // 每页条数
  pageSize?: number;
  // 省份
  province?: string;
  // 注册时间
  registerTime?: string;
  // 性别
  sex?: number;
  volunteer?: Volunteer;
  volunteerId?: number;
}

export interface ResponseData<T> {
  // 返回数据
  data?: T;
  // 状态信息
  message?: string;
  // refreshToken
  refreshToken?: string;
  // 状态码
  status?: number;
  // accessToken
  token?: string;
}

export type JavaList<T> = Array<T>;

export interface Volunteer {
  // 头像
  avatarUrl?: string;
  // 志愿者ID
  id?: number;
  // 位置所在纬度
  latitude?: number;
  // 位置所在经度
  longitude?: number;
  // 昵称
  nickName?: string;
  // 是否在线
  online?: number;
  // 手机号
  phone?: string;
  // 用户状态
  state?: number;
  userinfo?: object;
  // 志愿者信息
  volunteerInformation?: VolunteerInformation;
}

export interface Timestamp {
  date?: number;
  day?: number;
  hours?: number;
  minutes?: number;
  month?: number;
  nanos?: number;
  seconds?: number;
  time?: number;
  timezoneOffset?: number;
  year?: number;
}

export interface UpdateAdminAvatar {
  // 头像Url
  avatarUrl?: string;
  // 志愿者信息ID
  id?: string;
}

export interface UpdatePassword {
  // 新密码
  newPassword?: string;
  // 旧密码
  oldPassword?: string;
}

export interface VolunteerAvatarUrl {
  // 头像链接
  avatarUrl?: string;
}

export interface VolunteerBindPhone {
  // 验证码
  code?: string;
  // 手机号
  phone?: string;
}

export interface VolunteerCase {
  // 案件ID
  caseId?: number;
  // 装备是否齐全，1为齐全，2为不齐全
  equipment?: number;
  // 关联表ID
  id?: number;
  // 状态（1为接受，2为拒绝，3为退出）
  state?: number;
  // 交通工具
  traffic?: string;
  // 志愿者
  volunteer?: Volunteer;
  // 志愿者ID
  volunteerId?: number;
}

export interface VolunteerLoginCode {
  // 从微信获取的code
  code?: string;
}

export interface VolunteerRefreshToken {
  // refreshToken
  refreshToken?: string;
}

export interface VolunteerUnbindCode {
  // 验证码
  code?: string;
}

export interface volunteerUserInfo {
  // 加密字符串
  encryptedData?: string;
  // 从微信获取的iv
  iv?: string;
}

export interface zzzzzzzzzzzzzzz {
  // 加密字符串
  encryptedData?: string;
  // 从微信获取的iv
  iv?: string;
}

/* 维修订单类型 */
export interface repairOrder {
  // 关联表ID
  id?: number;
  //用户ID
  userId?: number | null;
  //维修订单名称
  name?: string | null;
  //用户电话
  phone?: string | null;
  //维修地区-省
  province?: string | null;
  //维修地区-城市
  city?: string | null;
  //维修地区-地区
  district?: string | null;
  //维修地区-详细地址
  address?: string | null;
  //维修地区-经度
  latitude?: number | null;
  //维修地区-维度
  longitude?: number | null;
  //维修详情
  repairEquipmentContent?: Array<repairDetail> | null;
  //维修数量
  repairEquipmentNumber?: number | null;
  //期望维修日期
  expectDate?: string | null;
  expectVolunteerId?: number | null;
  volunteerId?: number | null;
  orderType?: number | null;
  cancelNumber?: number | null;
  creatorType?: number | null;
  state?: number | null;
  createdAt?: string | null;
  checkAt?: string | null;
  receiveAt?: string | null;
  finishAt?: string | null;
  confirmAt?: string | null;
  cancelAt?: string | null;
  updatedAt?: string | null;
  createTime?: string | null;
  familyUser?: familyUser | null;
  startAt?: string | null;
  endAt?: string | null;
  orderColumn?: string | null;
  orderWay?: string | null;
  //距离
  distance?: string | null;
}

export interface familyUser {
  //用户id
  id?: number;
  //姓名
  name?: string | null;
  //电话
  phone?: string | null;
  //性别
  sex?: number | null;
  //昵称
  nickName?: string | null;
  //用户头像
  avatarUrl?: string | null;
  //用户国家
  country?: string | null;
  //省
  province?: string | null;
  //城市
  city?: string | null;
  //地区
  district?: string | null;
  //状态
  state?: number | null;
  //注册时间
  registerTime?: string | null;
}

export interface repairDetail {
  //维修电气名称
  equipmentName?: string;
  //维修电气描述
  repairDesc?: string;
  //上传照片
  equipmentImg?: string[];
}
export interface Leaderboard {
  id?: number;
  volunteerId?: number;
  name?: string;
  phone?: string;
  avatarUrl?: string;
  receiveNumber?: number;
  backNumber?: number;
  againNumber?: number;
  responseDuration?: number;
  cancelRate?: number;
}
