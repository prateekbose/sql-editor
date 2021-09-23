import Editor from "@monaco-editor/react"

interface EditorProps{
    themes: Array<string>,
    theme: number,
    code: string,
    setCode: (c: string) => void,
    setQuery: (c: string) => void
}

export default function CodeEditor({themes, theme, code, setCode, setQuery}: EditorProps){
    return (
        <div className="code-editor">
            <div className="code-editor-top-bar">
              <h1>Code</h1>
              <div className="btn-section">
                <button onClick={() => setQuery(code)}>Run Query</button>
              </div>
            </div>
            <Editor
              height="55vh"
              width="100%"
              theme={themes[theme]}
              defaultLanguage="sql"
              defaultValue={code}
              onChange={(c) => setCode(String(code))}
              options={{
                "acceptSuggestionOnCommitCharacter": true,
                "acceptSuggestionOnEnter": "on",
                "accessibilitySupport": "auto",
                "autoIndent": true,
                "automaticLayout": true,
                "codeLens": true,
                "colorDecorators": true,
                "contextmenu": false,
                "cursorBlinking": "blink",
                "cursorSmoothCaretAnimation": false,
                "disableLayerHinting": false,
                "disableMonospaceOptimizations": false,
                "dragAndDrop": false,
                "fixedOverflowWidgets": false,
                "folding": true,
                "foldingStrategy": "auto",
                "fontLigatures": false,
                "formatOnPaste": false,
                "formatOnType": false,
                "hideCursorInOverviewRuler": false,
                "highlightActiveIndentGuide": true,
                "links": true,
                "mouseWheelZoom": false,
                "multiCursorMergeOverlapping": true,
                "multiCursorModifier": "alt",
                "overviewRulerBorder": false,
                "overviewRulerLanes": 2,
                "quickSuggestions": true,
                "quickSuggestionsDelay": 100,
                "readOnly": false,
                "renderControlCharacters": false,
                "renderFinalNewline": true,
                "renderIndentGuides": true,
                "renderLineHighlight": "all",
                "renderWhitespace": "none",
                "revealHorizontalRightPadding": 30,
                "scrollBeyondLastColumn": 5,
                "scrollBeyondLastLine": true,
                "selectOnLineNumbers": true,
                "selectionClipboard": true,
                "selectionHighlight": true,
                "showFoldingControls": "mouseover",
                "smoothScrolling": false,
                "suggestOnTriggerCharacters": true,
                "wordBasedSuggestions": true,
                "wordSeparators": "~!@#$%^&*()-=+[{]}|;:'\",.<>/?",
                "wordWrap": "off",
                "wordWrapBreakAfterCharacters": "\t})]?|&,;",
                "wordWrapBreakBeforeCharacters": "{([+",
                "wordWrapBreakObtrusiveCharacters": ".",
                "wordWrapColumn": 80,
                "wordWrapMinified": true,
                "wrappingIndent": "none",
                "minimap": {
                  "enabled": false
                }
              }}
            />
          </div>
    )
}