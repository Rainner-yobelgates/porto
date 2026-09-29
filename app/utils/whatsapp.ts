export interface WhatsAppMessageInput {
  name: string
  message: string
}

export function buildWhatsAppUrl(phone: string, input: WhatsAppMessageInput) {
  const text = [
    'Hi Rainner,',
    '',
    `My name is ${input.name.trim()}.`,
    '',
    input.message.trim(),
  ].join('\n')
  return `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`
}
