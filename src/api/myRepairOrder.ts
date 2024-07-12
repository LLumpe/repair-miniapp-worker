import http from "@/utils/request";
import { Banner, JavaList, Notice, ResponseData } from "./types/models";

/**
 * 上传维修图片
 *
 * @return {*}
 */
export const requestUploadImage = (filePath: string) => {
  return http.upload<ResponseData<string>>(`volunteer/photo`, {
    filePath,
    name: "photo",
  });
};
