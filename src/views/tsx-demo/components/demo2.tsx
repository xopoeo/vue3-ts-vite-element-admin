import { ref } from "vue"

type UserProps = {
  userName?: string
}

// User.props

function User(props: UserProps = { userName: "默认值" }) {
  const name = ref("天气好")
  return (
    <>
      <div>{props.userName}</div>
      <div>{name.value}</div>
    </>
  )
}

export default User
