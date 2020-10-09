import Ajax from "assets/js/common/ajax";
//用户信息
export default {
    //分页
    page(params,success,fail,type){
        Ajax(`/dolphin-auth/management/oauth/current/user`,params,success,fail,type);
    },
    //更新
    update(params,success,fail,type){
        Ajax(`/dolphin-auth/management/oauth/current/user`,params,success,fail,type);
    },
    //删除
    delete(params,success,fail,type){
        Ajax(`/dolphin-auth/management/oauth/current/user`,params,success,fail,type);
    },
    //下载
    download(params,success,fail,type){
        Ajax(`/dolphin-auth/management/oauth/current/user/${params.id}`,params,success,fail,type);
    },
    //保存新增
    save(params,success,fail,type){
        Ajax(`/dolphin-auth/management/oauth/current/user`,params,success,fail,type);
    },
    //查询
    query(params,success,fail,type){
        Ajax(`/dolphin-auth/management/oauth/current/user`,params,success,fail,type);
    }
};