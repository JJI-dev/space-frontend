import { redirect } from 'next/navigation'

export default function TokenRootPage() {
  // /token 으로 접속하면 자동으로 첫 번째 메뉴로 넘겨줍니다.
  redirect('/token/foundation/identity')
}