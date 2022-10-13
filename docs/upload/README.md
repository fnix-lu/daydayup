# AntD & Element 自定义上传

## ant-design upload customRequest

```
export function customUpload({
  file,
  onProgress,
  onSuccess,
  onError
}, type = 'private') {
  console.log(file)
  const formData = new FormData()
  formData.append('file', file)

  return uploadFile(
    formData,
    ({ loaded, total }) => {
      onProgress({ percent: Math.round(loaded / total * 100) }, file)
    },
    type
  )
    .then(res => {
      onSuccess(res.data, file)
      return res
    })
    .catch(onError)
}
```

## element-ui httpRequest

```
import { getQiniuToken, upload } from '@/api/qiniu'

export async function uploadFile (ctx) {
  const {
    file,
    onProgress,
    onSuccess,
    onError
  } = ctx

  const { data: qiniuToken } = await getQiniuToken()

  const formData = new FormData()
  formData.append('token', qiniuToken)
  formData.append('file', file)

  upload(formData, onProgress).then(response => {
    onSuccess(response.data)
  }).catch(onError)
}
```
