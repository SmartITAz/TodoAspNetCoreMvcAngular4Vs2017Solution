using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using SmartIT.Employee.MockDB;

namespace TodoAngular.Ui.Controllers
{
  [Produces("application/json")]
  [Route("api/Todo")]
  public class TodoController : Controller
  {
    private readonly ITodoRepository _todoRepository;
    public TodoController(ITodoRepository todoRepository)
    {
      _todoRepository = todoRepository;
    }

    [Route("~/api/GetAllTodos")]
    [HttpGet]
    public IEnumerable<Todo> GetAllTodos()
    {
      return _todoRepository.GetAll();
    }

    [Route("~/api/AddTodo")]
    [HttpPost]
    public Todo AddTodo([FromBody]Todo item)
    {
      return _todoRepository.Add(item);
    }

    [Route("~/api/UpdateTodo")]
    [HttpPut]
    public Todo UpdateTodo([FromBody]Todo item)
    {
      return  _todoRepository.Update(item);
    }

    [Route("~/api/DeleteTodo/{id}")]
    [HttpDelete]
    public void Delete(int id)
    {
      var findTodo = _todoRepository.FindById(id);
      if (findTodo != null)
        _todoRepository.Delete(findTodo);
    }
  }
}
