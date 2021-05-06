export default function({ app, redirect }) {
  if (app.$cookies.get("TOKEN")) {
    return redirect("/")
  }
}