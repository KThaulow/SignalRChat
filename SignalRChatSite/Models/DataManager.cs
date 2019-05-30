using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRChartSite.Models
{
	public static class DataManager
	{
		public static List<ChartModel> GetData()
		{
			var r = new Random();
			return new List<ChartModel>()
			{
			   new ChartModel { Label = "Data1" },
			   new ChartModel { Label = "Data2" },
			   new ChartModel { Label = "Data3" },
			   new ChartModel { Label = "Data4" }
			};
		}
	}
}
