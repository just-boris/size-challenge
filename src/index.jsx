import {AppLayoutToolbar, Button, Flashbar} from "@cloudscape-design/components";

export function App() {
    return <AppLayoutToolbar notifications={<Flashbar items={[]} content={<Button>Test</Button>} />}/>
}
