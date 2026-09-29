import { test } from 'node:test'
import assert from 'node:assert/strict'
import { searchPortfolio, normalizeQuery } from '../app/utils/search.ts'
import { addRecentQuery } from '../app/utils/history.ts'
import { buildWhatsAppUrl } from '../app/utils/whatsapp.ts'
import { projects } from '../content/portfolio.ts'

test('search handles case, partial words, aliases, intent, and category', () => {
  assert.equal(normalizeQuery('  NÉST.js  '), 'nest js')
  assert.equal(searchPortfolio('wMs')[0]?.title, 'Warehouse Management System')
  assert.equal(searchPortfolio('warehouse stock')[0]?.title, 'Warehouse Management System')
  assert.equal(searchPortfolio('NestJS projects')[0]?.title, 'NestJS')
  assert.ok(searchPortfolio('zkteco').some((result) => result.category === 'Experience'))
  assert.ok(
    searchPortfolio('software engineer experience').some(
      (result) => result.category === 'Experience',
    ),
  )
  assert.ok(searchPortfolio('AI debugging').some((result) => result.category === 'Skills'))
  assert.ok(searchPortfolio('rainner', 'About').length)
  assert.equal(searchPortfolio('NestJS', 'Projects').length, 0)
  assert.equal(searchPortfolio('thisdoesnotexist').length, 0)
})
test('history deduplicates normalized queries, keeps newest first and caps at eight', () => {
  let history: string[] = []
  for (let index = 0; index < 10; index++) history = addRecentQuery(history, `Query ${index}`)
  assert.equal(history.length, 8)
  history = addRecentQuery(history, ' QUERY  5 ')
  assert.equal(history[0], 'QUERY  5')
  assert.equal(history.filter((item) => normalizeQuery(item) === 'query 5').length, 1)
  assert.deepEqual(addRecentQuery(history, '  '), history)
})
test('missing URLs and technology assignments stay explicit', () => {
  assert.ok(
    projects.every(
      (project) =>
        project.image === null &&
        project.liveUrl === null &&
        project.repositoryUrl === null &&
        project.technologies.length === 0,
    ),
  )
})
test('contact messages are encoded as a WhatsApp redirect', () => {
  const url = new URL(
    buildWhatsAppUrl('6282123595108', {
      name: 'Test Visitor',
      message: 'A meaningful message for local validation.',
    }),
  )
  assert.equal(url.origin, 'https://wa.me')
  assert.equal(url.pathname, '/6282123595108')
  assert.equal(
    url.searchParams.get('text'),
    'Hi Rainner,\n\nMy name is Test Visitor.\n\nA meaningful message for local validation.',
  )
})
