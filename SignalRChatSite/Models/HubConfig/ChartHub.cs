using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRChartSite.Models.HubConfig
{
	[Authorize]
	public class ChartHub : Hub
	{
		public Task SendToAll(string message)
		{
			return Clients.All.SendAsync("SendMessage", message);
		}

		public Task SendMessageToCaller(string message)
		{
			return Clients.Caller.SendAsync("SendMessage", message);
		}

		public Task SendMessageToUser(string connectionId, string message)
		{
			return Clients.Client(connectionId).SendAsync("SendMessage", message);
		}
	}
}
