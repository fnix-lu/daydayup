(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{369:function(n,e,t){"use strict";t.r(e);var a=t(41),s=Object(a.a)({},(function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[t("h1",{attrs:{id:"antd-element-自定义上传"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#antd-element-自定义上传"}},[n._v("#")]),n._v(" AntD & Element 自定义上传")]),n._v(" "),t("h2",{attrs:{id:"ant-design-upload-customrequest"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#ant-design-upload-customrequest"}},[n._v("#")]),n._v(" ant-design upload customRequest")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("export function customUpload({\n  file,\n  onProgress,\n  onSuccess,\n  onError\n}, type = 'private') {\n  console.log(file)\n  const formData = new FormData()\n  formData.append('file', file)\n\n  return uploadFile(\n    formData,\n    ({ loaded, total }) => {\n      onProgress({ percent: Math.round(loaded / total * 100) }, file)\n    },\n    type\n  )\n    .then(res => {\n      onSuccess(res.data, file)\n      return res\n    })\n    .catch(onError)\n}\n")])])]),t("h2",{attrs:{id:"element-ui-httprequest"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#element-ui-httprequest"}},[n._v("#")]),n._v(" element-ui httpRequest")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("import { getQiniuToken, upload } from '@/api/qiniu'\n\nexport async function uploadFile (ctx) {\n  const {\n    file,\n    onProgress,\n    onSuccess,\n    onError\n  } = ctx\n\n  const { data: qiniuToken } = await getQiniuToken()\n\n  const formData = new FormData()\n  formData.append('token', qiniuToken)\n  formData.append('file', file)\n\n  upload(formData, onProgress).then(response => {\n    onSuccess(response.data)\n  }).catch(onError)\n}\n")])])])])}),[],!1,null,null,null);e.default=s.exports}}]);