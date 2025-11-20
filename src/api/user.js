import { queryService } from '@/utils/axios.js'

export const user = {

    // 获取列表数据
    list: (params) => queryService.get('/users', { params: params }),

}
