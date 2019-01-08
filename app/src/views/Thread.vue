<template>
<div class="container">
	<div class="row">
		<div class="col-md-9">
		    <div class="row mb-2">
		        <div class="col-md-12">
		            <div class="card">
		                <div class="card-body">
		                    <div class="row">
		                        <div class="col-md-12">
		                            <div class="news-title">
		                                <h2>{{thread.Title}}</h2>
		                            </div>
		                            <div class="news-cats">
		                                <ul class="list-unstyled list-inline mb-1">
		                                    <li class="list-inline-item">
		                                            <i class="fa fa-folder-o text-danger"></i>
    		                                        <a href="#"><small>{{thread.course}}</small> </a>
		                                    </li>

		                                     <li class="list-inline-item">
		                                            <i class="fa fa-folder-o text-danger"></i>
    		                                        <a href="#"><small>4th July 2018</small></a>
		                                    </li>
		                                  
		                                    
		                                    
		                                    
		                                </ul>
		                            </div>
		                            <hr>
		                            
		                            <div class="news-content">
		                                <p>{{thread.question}}</p>
		                                
		                                
		                            </div>
		                            <hr>
		                            <div class="news-footer">
		                                <div class="news-likes">
		                                     <button type="button" class="btn btn-outline-secondary"><i class="fa fa-thumbs-o-up text-success"></i> <span class="badge ">Upvotes {{thread.upvotes}}</span></button>
		                                </div>
		                            </div>
		                            <hr>
		                            <div class="news-tags">
		                                <h5>Tags</h5>
		                                <button type="button" class="btn btn-sm btn-secondary" v-for="(tag,index) in thread.tags" v-bind:key="index">
                                          {{tag}}
                                        </button>
		                            </div>
		                            <hr>
		                            <div class="news-author">
		                                <div class="row">
                                            <div class="col-md-auto">
                                                    <a href="#" title="Biswajit Saha"> <img v-bind:src="user.foto" alt="Author image" class="rounded-circle" style="width:100px"></a>
                                            </div>
                                            <div class="col">
                                                <div class="auth-title">
                                                    <h4 class="author h4"><a href="/author/biswajit/">{{user.name}}</a></h4>
                                                    <ul class="list-unstyled list-inline">
                                                        <li class="list-inline-item"> Rank: {{user.rank}}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
		                            </div>
		                        </div>
		                    </div>
		                </div>
		            </div>
		        </div>
		    </div>
		    
		</div>
		<div class="col-md-3">
		    <div class="row mb-2">
		      <div class="col-md-12">
		          <div class="card">
		             <div class="row">
        		      <div class="col-md-12">
        		          <div class="card">
        		            <div class="card-body">
        		                <h5>Related</h5>
        		            </div>
        		           </div>
        		      </div>
        		     </div>
		             <div class="list-group">
                      <a href="#" class="list-group-item list-group-item-action active">First item</a>
                      <a href="#" class="list-group-item list-group-item-action">Second item</a>
                      <a href="#" class="list-group-item list-group-item-action">Third item</a>
                    </div> 
		           </div>
		      </div>
		     </div>
		    
	     </div>
		
	</div>
</div>
</template>

<script>
window.addEventListener("click", contarClicks);
function contarClicks(nClicks) {
  
  
}

export default{
  data() {
    return {
      thread: null,
      user:null
    }
  },
  created(){
    let threadid=this.$route.params.threadid
    this.thread = this.$store.getters.getThreads.filter(thread=>thread.id==threadid)[0]
    this.user = this.$store.getters.getUsers.filter(user=>this.thread.userId==user.id)[0]
    console.log("OLAAAA")
    

  }
}
</script>

<style>

img{width:100%;}
</style>
