export default function({ app, store, redirect }) {
  if (!app.$cookies.get("TOKEN")) return redirect("/auth/login")
}