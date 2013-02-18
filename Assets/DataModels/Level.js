#pragma strict

class Level
{
	public var Name: String;
	public var Rows: String[];
	
	public function Level(name: String, rows: String[])
	{
		this.Name = name;
		this.Rows = rows;
	}
}