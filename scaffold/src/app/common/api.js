/*
Copyright 2014 Huawei Technologies Co., Ltd. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */
import {loading} from "./loading";
import {notify} from "./notify";

let apiUrlConf = {
	"host" : "",
	"workflow" : {
		"list" : "/v2/{namespace}/{repository}/workflow/v1/define/list",
		"data" : "/v2/{namespace}/{repository}/workflow/v1/define/{workflowName}?id={workflowID}",
		"add" : "/v2/{namespace}/{repository}/workflow/v1/define",
		"save" : "/v2/{namespace}/{repository}/workflow/v1/define/{workflowName}",
		"eventOutput" : "/v2/{namespace}/{repository}/workflow/v1/define/event/{site}/{eventName}",
		"getEnv" : "/v2/{namespace}/{repository}/workflow/v1/define/{workflowName}/env?id={workflowID}",
		"setEnv" : "/v2/{namespace}/{repository}/workflow/v1/define/{workflowName}/env",
		"getVar" : "/v2/{namespace}/{repository}/workflow/v1/define/{workflowName}/var?id={workflowID}",
		"setVar" : "/v2/{namespace}/{repository}/workflow/v1/define/{workflowName}/var",
		"changeState" : "/v2/{namespace}/{repository}/workflow/v1/define/{workflowName}/state",
		"getToken" : "/v2/{namespace}/{repository}/workflow/v1/define/{workflowName}/token?id={workflowID}"
	},

	"component" : {
		"list" : "/v2/{namespace}/component/list",
		"data" : "/v2/{namespace}/component/{componentName}?id={componentID}",
		"add" : "/v2/{namespace}/component",
		"save" : "/v2/{namespace}/component/{componentName}"
	},

	"history" : {
		"workflowHistories" : "/v2/{namespace}/{repository}/workflow/v1/log/list",
		"workflowHistory" : "/v2/{namespace}/{repository}/workflow/v1/log/{workflowName}/{version}?sequence={sequence}",
		"action" : "/v2/{namespace}/{repository}/workflow/v1/log/{workflowName}/{version}/{sequence}/stage/{stageName}/action/{actionName}",
		"relation" : "/v2/{namespace}/{repository}/workflow/v1/log/{workflowName}/{version}/{sequence}/{lineId}"
	},

	"setting" : "/v2/{namespace}/{repository}/system/v1/setting"
}
let pendingPromise;

// abort
function initApiInvocation(skipAbort){
	if(_.isEmpty(apiUrlConf.host)){
		$.ajax({
	        "url": "/host.json",
	        "async" : false,
	        "type": "GET",
	        "dataType": "json",
	        "cache": false,
	        "success" : function(obj) {
			    apiUrlConf.host = obj.host;
			},
			"error" : function(error){
				notify("Can not find API host configuration file.","error");
			}
	    });
	}

	if(!skipAbort){
		_.each(pendingPromise,function(promise){
			promise.abort();
		});			
		pendingPromise = [];
	}
	loading.show();
}

// workflow
export let workflowApi = {
	"list" : function(){
		initApiInvocation();
		var promise = $.ajax({
	        "url": apiUrlConf.host + apiUrlConf.workflow.list.replace(/{namespace}/g, "demo").replace(/{repository}/g, "demo"),
	        "type": "GET",
	        "dataType": "json",
	        "cache": false
	    });
	    pendingPromise.push(promise);
	    return promise;
	},
	"data" : function(name,id){
		initApiInvocation();
		var promise = $.ajax({
	        "url": apiUrlConf.host + apiUrlConf.workflow.data.replace(/{namespace}/g, "demo").replace(/{repository}/g, "demo").replace(/{workflowName}/g, name).replace(/{workflowID}/g, id),
	        "type": "GET",
	        "dataType": "json",
	        "cache": false
	    });
	    pendingPromise.push(promise);
	    return promise;
	},
	"add" : function(name,version){
		initApiInvocation();
		var data = JSON.stringify({
				"name":name,
				"version":version
			});
		var promise = $.ajax({
	        "url": apiUrlConf.host + apiUrlConf.workflow.add.replace(/{namespace}/g, "demo").replace(/{repository}/g, "demo"),
	        "type": "POST",
	        "dataType": "json",
	        "data": data
	    });
	    pendingPromise.push(promise);
	    return promise;
	},
	"save" : function(name,reqbody){
		initApiInvocation();
		var data = JSON.stringify(reqbody);
		var promise = $.ajax({
	        "url": apiUrlConf.host + apiUrlConf.workflow.save.replace(/{namespace}/g, "demo").replace(/{repository}/g, "demo").replace(/{workflowName}/g, name),
	        "type": "PUT",
	        "dataType": "json",
	        "data": data
	    });
	    pendingPromise.push(promise);
	    return promise;
	},
	"eventOutput" : function(name){
		initApiInvocation(true);
		var promise = $.ajax({
	        "url": apiUrlConf.host + apiUrlConf.workflow.eventOutput.replace(/{namespace}/g, "demo").replace(/{repository}/g, "demo").replace(/{site}/g, "github").replace(/{eventName}/g, name),
	        "type": "GET",
	        "dataType": "json",
	        "cache": false
	    });
	    pendingPromise.push(promise);
	    return promise;
	},
	"getEnv" : function(name,id){
		initApiInvocation();
		var promise = $.ajax({
	        "url": apiUrlConf.host + apiUrlConf.workflow.getEnv.replace(/{namespace}/g, "demo").replace(/{repository}/g, "demo").replace(/{workflowName}/g, name).replace(/{workflowID}/g, id),
	        "type": "GET",
	        "dataType": "json",
	        "cache": false
	    });
	    pendingPromise.push(promise);
	    return promise;
	},
	"setEnv" : function(name,reqbody){
		initApiInvocation();
		var data = JSON.stringify(reqbody);
		var promise = $.ajax({
	        "url": apiUrlConf.host + apiUrlConf.workflow.setEnv.replace(/{namespace}/g, "demo").replace(/{repository}/g, "demo").replace(/{workflowName}/g, name),
	        "type": "PUT",
	        "dataType": "json",
	        "data": data
	    });
	    pendingPromise.push(promise);
	    return promise;
	},
	"getVar" : function(name,id){
		initApiInvocation();
		var promise = $.ajax({
	        "url": apiUrlConf.host + apiUrlConf.workflow.getVar.replace(/{namespace}/g, "demo").replace(/{repository}/g, "demo").replace(/{workflowName}/g, name).replace(/{workflowID}/g, id),
	        "type": "GET",
	        "dataType": "json",
	        "cache": false
	    });
	    pendingPromise.push(promise);
	    return promise;
	},
	"setVar" : function(name,reqbody){
		initApiInvocation();
		var data = JSON.stringify(reqbody);
		var promise = $.ajax({
	        "url": apiUrlConf.host + apiUrlConf.workflow.setVar.replace(/{namespace}/g, "demo").replace(/{repository}/g, "demo").replace(/{workflowName}/g, name),
	        "type": "PUT",
	        "dataType": "json",
	        "data": data
	    });
	    pendingPromise.push(promise);
	    return promise;
	},
	"changeState" : function(name,reqbody){
		initApiInvocation();
		var data = JSON.stringify(reqbody);
		var promise = $.ajax({
	        "url": apiUrlConf.host + apiUrlConf.workflow.changeState.replace(/{namespace}/g, "demo").replace(/{repository}/g, "demo").replace(/{workflowName}/g, name),
	        "type": "PUT",
	        "dataType": "json",
	        "data": data
	    });
	    pendingPromise.push(promise);
	    return promise;
	},
	"getToken" : function(name,id){
		initApiInvocation();
		var promise = $.ajax({
	        "url": apiUrlConf.host + apiUrlConf.workflow.getToken.replace(/{namespace}/g, "demo").replace(/{repository}/g, "demo").replace(/{workflowName}/g, name).replace(/{workflowID}/g, id),
	        "type": "GET",
	        "dataType": "json",
	        "cache": false
	    });
	    pendingPromise.push(promise);
	    return promise;
	}
}

// component
export let componentApi = {
	"list" : function(){
		initApiInvocation();
		var promise = $.ajax({
	        "url": apiUrlConf.host + apiUrlConf.component.list.replace(/{namespace}/g, "demo"),
	        "type": "GET",
	        "dataType": "json",
	        "cache": false
	    });
	    pendingPromise.push(promise);
	    return promise;
	},
	"data" : function(name,id){
		initApiInvocation();
		var promise = $.ajax({
	        "url": apiUrlConf.host + apiUrlConf.component.data.replace(/{namespace}/g, "demo").replace(/{componentName}/g, name).replace(/{componentID}/g, id),
	        "type": "GET",
	        "dataType": "json",
	        "cache": false
	    });
	    pendingPromise.push(promise);
	    return promise;
	},
	"add" : function(name,version){
		initApiInvocation();
		var data = JSON.stringify({
				"name":name,
				"version":version
			});
		var promise = $.ajax({
	        "url": apiUrlConf.host + apiUrlConf.component.add.replace(/{namespace}/g, "demo"),
	        "type": "POST",
	        "dataType": "json",
	        "data": data
	    });
	    pendingPromise.push(promise);
	    return promise;
	},
	"save" : function(name,reqbody){
		initApiInvocation();
		var data = JSON.stringify(reqbody);
		var promise = $.ajax({
	        "url": apiUrlConf.host + apiUrlConf.component.save.replace(/{namespace}/g, "demo").replace(/{componentName}/g, name),
	        "type": "PUT",
	        "dataType": "json",
	        "data": data
	    });
	    pendingPromise.push(promise);
	    return promise;
	}
}


export let historyApi = {
	
	"workflowHistories" : function () {
		initApiInvocation();
		var promise = $.ajax({
			"url" : apiUrlConf.host + apiUrlConf.history.workflowHistories.replace(/{namespace}/g, "demo").replace(/{repository}/g, "demo"),
			"type" : "GET",
			"dataType" : "json",
			"cache": false
		});
		pendingPromise.push(promise);
		return promise;
	},
	"workflowHistory" : function(workflowName,versionName,workflowRunSequence){
		initApiInvocation();
		var promise = $.ajax({
	        "url": apiUrlConf.host + apiUrlConf.history.workflowHistory.replace(/{namespace}/g, "demo").replace(/{repository}/g, "demo").replace(/{workflowName}/g, workflowName).replace(/{version}/g, versionName).replace(/{sequence}/g, workflowRunSequence),
	        "type": "GET",
	        "dataType": "json",
	        "cache": false
	    });
	    pendingPromise.push(promise);
	    return promise;
	},
	"action" : function(workflowName,versionName,workflowRunSequence,stageName,actionName){
		initApiInvocation();
		var promise = $.ajax({
	        "url": apiUrlConf.host + apiUrlConf.history.action.replace(/{namespace}/g, "demo").replace(/{repository}/g, "demo").replace(/{workflowName}/g, workflowName).replace(/{version}/g, versionName).replace(/{sequence}/g, workflowRunSequence).replace(/{stageName}/g, stageName).replace(/{actionName}/g, actionName),
	        "type": "GET",
	        "dataType": "json",
	        "cache": false
	    });
	    pendingPromise.push(promise);
	    return promise;
	},
	"relation" : function(workflowName,versionName,workflowRunSequence,sequenceLineId){
		initApiInvocation();
		var promise = $.ajax({
	        "url": apiUrlConf.host + apiUrlConf.history.relation.replace(/{namespace}/g, "demo").replace(/{repository}/g, "demo").replace(/{workflowName}/g, workflowName).replace(/{version}/g, versionName).replace(/{sequence}/g, workflowRunSequence).replace(/{lineId}/g, sequenceLineId),
	        "type": "GET",
	        "dataType": "json",
	        "cache": false
	    });
	    pendingPromise.push(promise);
	    return promise;
	}
}

export let settingApi = {
	"list" : function(){
		initApiInvocation();
		var promise = $.ajax({
	        "url": apiUrlConf.host + apiUrlConf.setting.replace(/{namespace}/g, "demo").replace(/{repository}/g, "demo"),
	        "type": "GET",
	        "dataType": "json",
	        "cache": false
	    });
	    pendingPromise.push(promise);
	    return promise;
	},
	"save" : function(reqbody){
		initApiInvocation();
		var data = JSON.stringify(reqbody);
		var promise = $.ajax({
	        "url": apiUrlConf.host + apiUrlConf.setting.replace(/{namespace}/g, "demo").replace(/{repository}/g, "demo"),
	        "type": "PUT",
	        "dataType": "json",
	        "data": data
	    });
	    pendingPromise.push(promise);
	    return promise;
	}
}
