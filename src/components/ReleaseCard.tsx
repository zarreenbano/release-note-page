import { Card, CardContent } from "@/components/ui/card";

export default function ReleaseCard({
  version,
  date,
  notes,
}: {
  version: string;
  date: string;
  notes: string[];
}) {
  return (
    <Card className="bg-gray-900 mb-6 border-gray-800">
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-2">{version}</h2>
        <p className="text-sm text-gray-400 mb-3">{date}</p>
        <ul className="list-disc list-inside space-y-1 text-gray-300">
          {notes.map((note, i) => (
            <li key={i}>{note}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
