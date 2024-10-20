import { useState, useEffect } from 'react';
import { Slider } from '@nextui-org/slider';
import { Button, NextUIProvider } from '@nextui-org/react';
import FontSizeIcon from './icon';

export default function App({ fontSizeNameFlag, isSettingsPage=false }: { fontSizeNameFlag: string; isSettingsPage?: boolean }) {
  const [fontSize, setFontSize] = useState(1);
  const [useDarkMode, setDarkMode] = useState(false);
  useEffect(() => {
    try {
      if (LiteLoader && Object.entries(LiteLoader.api.config)) {
        (async () => {
          const size = (await LiteLoader.api.config.get('ChangeMsgFontsize')).size;
          if (!isNaN(Number(size))) {
            setFontSize(Number(size));
            refreshFontSize(fontSizeNameFlag, Number(size));
          }
        })();
      }
    } catch (error) {
      console.error(error);
    }
    try {
      let darkMode = matchMedia('(prefers-color-scheme: dark)');
      setDarkMode(darkMode.matches);
      darkMode.onchange = ev => {
        setDarkMode(ev.matches);
      };
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <NextUIProvider className={useDarkMode ? 'dark' : ''}>
      <div className='p-1 px-4 border-t-1 border-solid border-[#0003] dark:!border-[#fff3] pt-1'>
        <Slider
          // label='字体大小'
          step={0.1}
          maxValue={5}
          minValue={1}
          // size='lg'
          showOutline={true}
          disableThumbScale={true}
          // showSteps={true}
          showTooltip={true}
          tooltipProps={{
            classNames: {
              content: String.raw`bg-[var(--el-color-primary)]`,
              base: String.raw`before:bg-[var(--el-color-primary)]`,
            },
          }}
          startContent={<FontSizeIcon className={String.raw`text-2xl text-[var(--el-color-primary)] dark:text-[#bbb]`}></FontSizeIcon>}
          classNames={{
            filler: String.raw`bg-[var(--el-color-primary)]`,
            track: String.raw`[border-inline-start-color:var(--el-color-primary)]`,
            thumb: String.raw`bg-[var(--el-color-primary)]`,
          }}
          value={fontSize}
          className='w-full '
          onChange={(e: any) => {
            setFontSize(e.valueOf() as number);
            try {
              if (LiteLoader && Object.entries(LiteLoader.api.config)) {
                LiteLoader.api.config.set('ChangeMsgFontsize', { size: e.valueOf() });
              }
            } catch (error) {
              // console.error(error);
            }
            refreshFontSize(fontSizeNameFlag, e.valueOf() as number);
          }}
        />
      </div>
    </NextUIProvider>
  );
}

function refreshFontSize(fontSizeNameFlag: string, size: number = 1) {
  document.querySelectorAll(`style[${fontSizeNameFlag}]`).forEach(ele => {
    ele.remove();
  });
  const tag = document.createElement('style');
  tag.textContent = `
    .message-content {
      font-size: ${size}em !important;
      line-height: 120% !important;
     }`;
  tag.setAttribute(fontSizeNameFlag, '');
  document.documentElement.appendChild(tag);
}
