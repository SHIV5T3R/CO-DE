import { X } from 'lucide-react';
import useEditorConfigStore from '@/stores/useEditorConfigStore';

export default function TerminalHeader() {
  const {setIsTerminalVisible} = useEditorConfigStore(state => state);

  return (
    <div className='flex justify-between items-center w-full px-4 py-1 text-xs text-muted/70'>
      <p className='border-b border-accent'>TERMINAL</p>
      <button 
        className="p-0.5 rounded-sm hover:bg-muted-foreground/20 transition-colors"
        onClick={() => setIsTerminalVisible(false)}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}