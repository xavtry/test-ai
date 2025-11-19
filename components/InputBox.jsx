export default function InputBox({ onSend, disabled }) {
  return (
    <div className="p-4 bg-black border-t-4 border-purple-600">
      <input
        type="text"
        placeholder="ask BroBot 3000 to code something..."
        className="w-full p-4 rounded-full bg-gray-900 text-white text-xl outline-none border-4 border-pink-600 focus:border-green-500 transition"
        onKeyPress={(e) => e.key === 'Enter' && onSend(e.target.value) && (e.target.value = '')}
        disabled={disabled}
      />
    </div>
  );
}
