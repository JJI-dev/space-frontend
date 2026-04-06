'use client'

import { useState, useEffect } from 'react'
import Footer from '@/components/layout/Footer'
import styles from './ask.module.css'

const getRelativeTime = (dateString: string) => {
  const now = new Date().getTime();
  const target = new Date(dateString).getTime();
  const diff = (now - target) / 1000;
  if (diff < 60) return '방금 전';
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  if (diff < 86400 * 30) return `${Math.floor(diff / 86400)}일 전`;
  const d = new Date(dateString);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export default function AskPage() {
  const [text, setText] = useState('')
  const [password, setPassword] = useState('')
  const [asks, setAsks] = useState<any[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const [myPosts, setMyPosts] = useState<number[]>([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminClickCount, setAdminClickCount] = useState(0)

  const fetchAsks = async () => {
    const res = await fetch('/api/ask')
    if (res.ok) setAsks(await res.json())
  }

  useEffect(() => {
    fetchAsks()
    const saved = localStorage.getItem('my_asks')
    if (saved) setMyPosts(JSON.parse(saved))
  }, [])

  const triggerToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 2500)
  }

  const handleSubmit = async () => {
    if (!text.trim()) return triggerToast('내용을 입력해주세요!')
    if (password.length < 4) return triggerToast('비밀번호 4자리를 입력해주세요!')
    
    const lastSent = localStorage.getItem('last_ask_time')
    if (lastSent && Date.now() - parseInt(lastSent) < 1000 * 60) return triggerToast('1분 뒤에 다시 보낼 수 있어요!')

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: text, password })
      })
      if (res.ok) {
        const data = await res.json()
        triggerToast('메시지가 전달되었습니다!')
        setText(''); setPassword('');
        localStorage.setItem('last_ask_time', Date.now().toString())
        const updated = [...myPosts, data.id]
        setMyPosts(updated)
        localStorage.setItem('my_asks', JSON.stringify(updated))
        fetchAsks()
      }
    } catch { triggerToast('오류가 발생했습니다.') } 
    finally { setIsSubmitting(false) }
  }

  const handleDelete = async (id: number) => {
    const inputPw = prompt('비밀번호를 입력하세요.')
    if (!inputPw) return
    const res = await fetch('/api/ask', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, password: inputPw })
    })
    if (res.ok) { triggerToast('삭제되었습니다.'); fetchAsks(); }
    else triggerToast('비밀번호가 틀렸습니다.')
  }

  return (
    <>
      <div className={`${styles.toast} ${toastMsg ? styles.toastVisible : ''}`}>{toastMsg}</div>
      <div className="page-enter">
        <div className={styles.heroArea} />
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.profileWrap}><img src="/icon.svg" alt="P" className={styles.profileImg} /></div>
            <div className={styles.cardHeader}>
              <h2 onClick={() => {
                const next = adminClickCount + 1; setAdminClickCount(next);
                if (next === 5) { setIsAdmin(true); triggerToast('🛡️ 관리자 모드 ON'); setAdminClickCount(0); }
              }} style={{ cursor: 'pointer', userSelect: 'none' }}>JJine님의 리퀘박스 💌</h2>
            </div>
            <div className={styles.formArea}>
              <textarea className={styles.textarea} placeholder="무엇이든 물어보거나 요청주세요~!" value={text} onChange={(e) => setText(e.target.value)} maxLength={500} />
              <div className={styles.formFooter}>
                <span className={styles.charCount}>{text.length} / 500</span>
                <div className={styles.actionGroup}>
                  <input type="password" placeholder="비번 4자리" className={styles.pwInput} value={password} onChange={(e) => setPassword(e.target.value)} maxLength={4} />
                  <button className={styles.submitBtn} onClick={handleSubmit} disabled={isSubmitting || !text.trim()}>보내기</button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.messageList}>
            <h3 className={styles.listTitle}>최근 도착한 리퀘스트 💌</h3>
            {asks.map((ask) => (
              <div key={ask.id} className={styles.messageItem}>
                <p className={styles.messageContent}>{ask.content}</p>
                <div className={styles.messageFooter}>
                  <span className={styles.messageDate}>{getRelativeTime(ask.date)}</span>
                  {(myPosts.includes(ask.id) || isAdmin) && <button className={styles.deleteBtn} onClick={() => handleDelete(ask.id)}>삭제</button>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}