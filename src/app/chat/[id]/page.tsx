import ChatClient from './ChatClient';

export function generateStaticParams() {
  return [
    { id: 'chat_1' },
    { id: 'chat_2' },
    { id: 'chat_3' },
  ];
}

export const dynamicParams = false;

export default function Page() {
  return <ChatClient />;
}
