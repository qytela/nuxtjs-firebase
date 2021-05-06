export default function (ctx, data, variant = "danger") {
  ctx._vm.$bvToast.toast(data.message || "Someting went wrong...", {
    title: data.code || "error",
    solid: true,
    variant
  })
}